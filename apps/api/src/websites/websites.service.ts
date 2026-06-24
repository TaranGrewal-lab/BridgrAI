import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateWebsiteDto } from "./dto/update-website.dto";

@Injectable()
export class WebsitesService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreate(weddingId: string) {
    const existing = await this.prisma.weddingWebsite.findUnique({ where: { weddingId } });
    if (existing) return existing;
    const wedding = await this.prisma.wedding.findUniqueOrThrow({ where: { id: weddingId } });
    return this.prisma.weddingWebsite.create({
      data: { weddingId, subdomain: wedding.slug },
    });
  }

  async update(weddingId: string, dto: UpdateWebsiteDto) {
    await this.getOrCreate(weddingId);
    return this.prisma.weddingWebsite.update({
      where: { weddingId },
      data: dto as Prisma.WeddingWebsiteUpdateInput,
    });
  }

  async getPublic(subdomain: string) {
    const site = await this.prisma.weddingWebsite.findUnique({
      where: { subdomain },
      include: {
        wedding: {
          select: {
            brideName: true,
            groomName: true,
            weddingDate: true,
            country: true,
            city: true,
            coverImageUrl: true,
            events: true,
          },
        },
      },
    });
    if (!site || !site.isPublished) throw new NotFoundException("Wedding website not found");
    return site;
  }

  async submitRsvp(subdomain: string, dto: { guestName: string; email?: string; phone?: string; eventIds: string[]; rsvpStatus: "ATTENDING" | "DECLINED"; plusOnes?: number; mealPreference?: string }) {
    const site = await this.prisma.weddingWebsite.findUnique({ where: { subdomain } });
    if (!site || !site.isPublished) throw new NotFoundException("Wedding website not found");

    const events = await this.prisma.event.findMany({
      where: { id: { in: dto.eventIds }, weddingId: site.weddingId },
      select: { id: true },
    });
    if (events.length === 0) throw new NotFoundException("No matching events for this wedding");

    let guest = await this.prisma.guest.findFirst({
      where: { weddingId: site.weddingId, name: { equals: dto.guestName, mode: "insensitive" } },
    });
    if (!guest) {
      guest = await this.prisma.guest.create({
        data: { weddingId: site.weddingId, name: dto.guestName, email: dto.email, phone: dto.phone },
      });
    }

    return Promise.all(
      events.map((event) =>
        this.prisma.guestInvite.upsert({
          where: { guestId_eventId: { guestId: guest!.id, eventId: event.id } },
          create: {
            guestId: guest!.id,
            eventId: event.id,
            rsvpStatus: dto.rsvpStatus,
            plusOnes: dto.plusOnes ?? 0,
            mealPreference: dto.mealPreference,
          },
          update: {
            rsvpStatus: dto.rsvpStatus,
            plusOnes: dto.plusOnes ?? 0,
            mealPreference: dto.mealPreference,
          },
        }),
      ),
    );
  }
}

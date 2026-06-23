import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGuestDto } from "./dto/create-guest.dto";
import { UpdateInviteDto } from "./dto/update-invite.dto";

@Injectable()
export class GuestsService {
  constructor(private readonly prisma: PrismaService) {}

  findAllForWedding(weddingId: string) {
    return this.prisma.guest.findMany({
      where: { weddingId },
      include: { invites: true },
      orderBy: { name: "asc" },
    });
  }

  create(weddingId: string, dto: CreateGuestDto) {
    return this.prisma.guest.create({ data: { ...dto, weddingId } });
  }

  update(id: string, dto: Partial<CreateGuestDto>) {
    return this.prisma.guest.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.guest.delete({ where: { id } });
  }

  // Cross-event RSVP grid for a single guest, e.g. attending Jaggo + Anand Karaj but not Mehndi.
  getInvitesForGuest(guestId: string) {
    return this.prisma.guestInvite.findMany({
      where: { guestId },
      include: { event: true },
    });
  }

  // All guests + their invite status for one event (event detail "Assigned Guests" panel).
  getInvitesForEvent(eventId: string) {
    return this.prisma.guestInvite.findMany({
      where: { eventId },
      include: { guest: true },
    });
  }

  assignGuestToEvent(guestId: string, eventId: string) {
    return this.prisma.guestInvite.upsert({
      where: { guestId_eventId: { guestId, eventId } },
      create: { guestId, eventId, isInvited: true },
      update: { isInvited: true },
    });
  }

  updateInvite(id: string, dto: UpdateInviteDto) {
    return this.prisma.guestInvite.update({ where: { id }, data: dto });
  }
}

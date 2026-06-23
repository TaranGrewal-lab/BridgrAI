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
      include: { wedding: true },
    });
    if (!site || !site.isPublished) throw new NotFoundException("Wedding website not found");
    return site;
  }
}

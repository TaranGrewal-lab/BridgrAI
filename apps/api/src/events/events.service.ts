import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { getTemplateItems } from "./event-templates";

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  findAllForWedding(weddingId: string) {
    return this.prisma.event.findMany({ where: { weddingId }, orderBy: { date: "asc" } });
  }

  create(weddingId: string, dto: CreateEventDto) {
    return this.prisma.event.create({
      data: { ...dto, weddingId, date: dto.date ? new Date(dto.date) : undefined },
    });
  }

  async applyTemplate(eventId: string) {
    const event = await this.prisma.event.findUniqueOrThrow({ where: { id: eventId } });
    const items = getTemplateItems(event.eventType);
    return this.prisma.$transaction(
      items.map((name, i) =>
        this.prisma.checklistItem.create({ data: { eventId, name, sortOrder: i } }),
      ),
    );
  }
}

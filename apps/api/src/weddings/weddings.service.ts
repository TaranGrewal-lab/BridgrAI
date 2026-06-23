import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateWeddingDto } from "./dto/create-wedding.dto";
import { randomUUID } from "crypto";

@Injectable()
export class WeddingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ownerId: string, dto: CreateWeddingDto) {
    const slug = `${(dto.brideName ?? "wedding").toLowerCase().replace(/\s+/g, "-")}-${randomUUID().slice(0, 6)}`;
    return this.prisma.wedding.create({
      data: {
        ...dto,
        weddingDate: dto.weddingDate ? new Date(dto.weddingDate) : undefined,
        slug,
        members: { create: { userId: ownerId, isOwner: true } },
      },
    });
  }

  async findOne(id: string) {
    const wedding = await this.prisma.wedding.findUnique({ where: { id } });
    if (!wedding) throw new NotFoundException("Wedding not found");
    return wedding;
  }

  async getDashboard(id: string) {
    const wedding = await this.findOne(id);
    const [events, guests, tasks, savedVendors, budgetSummary] = await Promise.all([
      this.prisma.event.findMany({ where: { weddingId: id } }),
      this.prisma.guest.findMany({ where: { weddingId: id } }),
      this.prisma.task.findMany({ where: { weddingId: id } }),
      this.prisma.savedVendor.findMany({ where: { weddingId: id } }),
      this.prisma.budgetSummary.findUnique({ where: { weddingId: id } }),
    ]);

    const upcomingEvents = events.filter((e) => e.date && e.date > new Date()).length;
    const tasksRemaining = tasks.filter((t) => t.status !== "DONE").length;

    return {
      wedding,
      widgets: {
        weddingProgress: this.calculateProgress(events, tasks),
        budgetUsed: budgetSummary?.totalActual ?? 0,
        totalBudget: wedding.totalBudget,
        guestCount: guests.length,
        upcomingEvents,
        tasksRemaining,
        savedVendorsCount: savedVendors.length,
        countdownDays: wedding.weddingDate
          ? Math.max(0, Math.ceil((wedding.weddingDate.getTime() - Date.now()) / 86_400_000))
          : null,
      },
    };
  }

  private calculateProgress(events: { status: string }[], tasks: { status: string }[]) {
    const total = events.length + tasks.length;
    if (total === 0) return 0;
    const done =
      events.filter((e) => e.status === "COMPLETED").length +
      tasks.filter((t) => t.status === "DONE").length;
    return Math.round((done / total) * 100);
  }
}

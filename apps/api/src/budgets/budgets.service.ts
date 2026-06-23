import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBudgetItemDto } from "./dto/create-budget-item.dto";

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  findAllForEvent(eventId: string) {
    return this.prisma.budgetItem.findMany({ where: { eventId }, orderBy: { createdAt: "asc" } });
  }

  async create(eventId: string, dto: CreateBudgetItemDto) {
    const item = await this.prisma.budgetItem.create({ data: { ...dto, eventId } });
    await this.recalculateWeddingSummary(eventId);
    return item;
  }

  async update(id: string, dto: Partial<CreateBudgetItemDto> & { status?: string }) {
    const item = await this.prisma.budgetItem.update({ where: { id }, data: dto as never });
    await this.recalculateWeddingSummary(item.eventId);
    return item;
  }

  async remove(id: string) {
    const item = await this.prisma.budgetItem.delete({ where: { id } });
    await this.recalculateWeddingSummary(item.eventId);
    return item;
  }

  // Wedding-wide totals: estimated, actual, deposits paid, and remaining balance,
  // derived live from every budget item across every event for the wedding.
  async getSummaryForWedding(weddingId: string) {
    const items = await this.prisma.budgetItem.findMany({
      where: { event: { weddingId } },
    });

    const totalEstimated = items.reduce((s, i) => s + Number(i.estimatedCost), 0);
    const totalActual = items.reduce((s, i) => s + Number(i.actualCost), 0);
    const totalDeposits = items.reduce((s, i) => s + Number(i.depositPaid), 0);
    const totalRemaining = totalActual - totalDeposits;

    return this.prisma.budgetSummary.upsert({
      where: { weddingId },
      create: { weddingId, totalEstimated, totalActual, totalDeposits, totalRemaining },
      update: { totalEstimated, totalActual, totalDeposits, totalRemaining },
    });
  }

  private async recalculateWeddingSummary(eventId: string) {
    const event = await this.prisma.event.findUniqueOrThrow({ where: { id: eventId } });
    return this.getSummaryForWedding(event.weddingId);
  }
}

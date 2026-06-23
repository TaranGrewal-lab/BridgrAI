import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BudgetsService } from "./budgets.service";
import { CreateBudgetItemDto } from "./dto/create-budget-item.dto";

@Controller()
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get("events/:eventId/budget-items")
  findAll(@Param("eventId") eventId: string) {
    return this.budgetsService.findAllForEvent(eventId);
  }

  @Post("events/:eventId/budget-items")
  create(@Param("eventId") eventId: string, @Body() dto: CreateBudgetItemDto) {
    return this.budgetsService.create(eventId, dto);
  }

  @Patch("budget-items/:id")
  update(@Param("id") id: string, @Body() dto: Partial<CreateBudgetItemDto>) {
    return this.budgetsService.update(id, dto);
  }

  @Delete("budget-items/:id")
  remove(@Param("id") id: string) {
    return this.budgetsService.remove(id);
  }

  @Get("weddings/:weddingId/budget-summary")
  getSummary(@Param("weddingId") weddingId: string) {
    return this.budgetsService.getSummaryForWedding(weddingId);
  }
}

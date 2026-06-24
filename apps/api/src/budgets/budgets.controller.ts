import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { BudgetsService } from "./budgets.service";
import { CreateBudgetItemDto } from "./dto/create-budget-item.dto";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";
import { CurrentUser, AuthUser } from "../common/decorators/current-user.decorator";
import { WeddingAccessService } from "../common/wedding-access.service";

@UseGuards(ClerkAuthGuard)
@Controller()
export class BudgetsController {
  constructor(
    private readonly budgetsService: BudgetsService,
    private readonly weddingAccess: WeddingAccessService,
  ) {}

  @Get("events/:eventId/budget-items")
  async findAll(@CurrentUser() user: AuthUser, @Param("eventId") eventId: string) {
    await this.weddingAccess.assertEventMember(eventId, user.clerkId);
    return this.budgetsService.findAllForEvent(eventId);
  }

  @Post("events/:eventId/budget-items")
  async create(@CurrentUser() user: AuthUser, @Param("eventId") eventId: string, @Body() dto: CreateBudgetItemDto) {
    await this.weddingAccess.assertEventMember(eventId, user.clerkId);
    return this.budgetsService.create(eventId, dto);
  }

  @Patch("budget-items/:id")
  async update(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() dto: Partial<CreateBudgetItemDto>) {
    await this.weddingAccess.assertBudgetItemMember(id, user.clerkId);
    return this.budgetsService.update(id, dto);
  }

  @Delete("budget-items/:id")
  async remove(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    await this.weddingAccess.assertBudgetItemMember(id, user.clerkId);
    return this.budgetsService.remove(id);
  }

  @Get("weddings/:weddingId/budget-summary")
  async getSummary(@CurrentUser() user: AuthUser, @Param("weddingId") weddingId: string) {
    await this.weddingAccess.assertWeddingMember(weddingId, user.clerkId);
    return this.budgetsService.getSummaryForWedding(weddingId);
  }
}

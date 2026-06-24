import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AiService } from "./ai.service";
import {
  ChecklistRequestDto,
  BudgetRecommendationDto,
  GuestGroupingDto,
  VendorRecommendationDto,
} from "./dto/ai.dto";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";

// Every route here calls the Anthropic API, which costs money per request —
// left open, anyone could anonymously script-loop this endpoint and run up
// the bill, so it requires a logged-in account like every other paid feature.
@UseGuards(ClerkAuthGuard)
@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("checklist")
  checklist(@Body() dto: ChecklistRequestDto) {
    return this.aiService.getChecklist(dto.eventType);
  }

  @Post("budget-recommendation")
  budgetRecommendation(@Body() dto: BudgetRecommendationDto) {
    return this.aiService.getBudgetRecommendation(dto.totalBudget, dto.eventTypes);
  }

  @Post("guest-grouping")
  guestGrouping(@Body() dto: GuestGroupingDto) {
    return this.aiService.getGuestGrouping(dto.guests);
  }

  @Post("vendor-recommendation")
  vendorRecommendation(@Body() dto: VendorRecommendationDto) {
    return this.aiService.getVendorRecommendation(dto.candidates);
  }
}

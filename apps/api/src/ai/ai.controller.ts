import { Body, Controller, Post } from "@nestjs/common";
import { AiService } from "./ai.service";
import {
  ChecklistRequestDto,
  BudgetRecommendationDto,
  GuestGroupingDto,
  VendorRecommendationDto,
} from "./dto/ai.dto";

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

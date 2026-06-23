import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";

@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get("plans")
  getPlans() {
    return this.subscriptionsService.getPlans();
  }

  @Post("checkout-session")
  createCheckoutSession(@Body("vendorId") vendorId: string, @Body("plan") plan: "SILVER" | "GOLD" | "PLATINUM") {
    return this.subscriptionsService.createCheckoutSession(vendorId, plan);
  }

  @Post("webhook")
  handleWebhook(@Req() req: Request & { body: never }) {
    return this.subscriptionsService.handleWebhookEvent(req.body as never);
  }
}

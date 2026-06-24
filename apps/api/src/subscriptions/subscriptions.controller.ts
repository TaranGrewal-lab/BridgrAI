import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import { VendorsService } from "../vendors/vendors.service";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";
import { CurrentUser, AuthUser } from "../common/decorators/current-user.decorator";

@Controller("subscriptions")
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly vendorsService: VendorsService,
  ) {}

  @Get("plans")
  getPlans() {
    return this.subscriptionsService.getPlans();
  }

  // Guarded so a vendor can only buy a subscription for their own listing.
  @UseGuards(ClerkAuthGuard)
  @Post("checkout-session")
  async createCheckoutSession(
    @CurrentUser() user: AuthUser,
    @Body("vendorId") vendorId: string,
    @Body("plan") plan: "SILVER" | "GOLD" | "PLATINUM",
  ) {
    const vendor = await this.vendorsService.findMine(user.clerkId);
    if (!vendor || vendor.id !== vendorId) {
      throw new ForbiddenException("You can only manage your own vendor subscription");
    }
    return this.subscriptionsService.createCheckoutSession(vendorId, plan);
  }

  // Stripe signs every webhook payload — verifying it here is what stops anyone
  // from POSTing a fake "checkout.session.completed" event to grant a free plan.
  @Post("webhook")
  handleWebhook(@Req() req: Request & { rawBody?: Buffer }, @Headers("stripe-signature") signature: string) {
    if (!req.rawBody || !signature) {
      throw new BadRequestException("Missing Stripe signature or payload");
    }
    const event = this.subscriptionsService.constructWebhookEvent(req.rawBody, signature);
    return this.subscriptionsService.handleWebhookEvent(event);
  }
}

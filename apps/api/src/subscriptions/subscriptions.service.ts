import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { PrismaService } from "../prisma/prisma.service";

export const VENDOR_PLAN_PRICES: Record<"SILVER" | "GOLD" | "PLATINUM", number> = {
  SILVER: 1900,
  GOLD: 4900,
  PLATINUM: 9900,
};

@Injectable()
export class SubscriptionsService {
  private stripeClient: Stripe | null = null;

  constructor(private readonly prisma: PrismaService) {}

  private get stripe(): Stripe {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    if (!this.stripeClient) {
      this.stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
    return this.stripeClient;
  }

  getPlans() {
    return [
      { plan: "FREE", price: 0, photos: 1, features: ["Basic Listing", "Contact Details"] },
      {
        plan: "SILVER",
        price: 19,
        photos: 20,
        features: ["Featured Listing", "Verified Badge", "Improved Search Placement"],
      },
      {
        plan: "GOLD",
        price: 49,
        photos: -1,
        features: ["Top Category Placement", "Homepage Features", "Analytics Dashboard", "Priority Ranking"],
      },
      {
        plan: "PLATINUM",
        price: 99,
        photos: -1,
        features: [
          "Homepage Spotlight",
          "Featured Vendor Banner",
          "Premium Badge",
          "Advanced Analytics",
          "Maximum Search Visibility",
        ],
      },
    ];
  }

  async createCheckoutSession(vendorId: string, plan: "SILVER" | "GOLD" | "PLATINUM") {
    const session = await this.stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            recurring: { interval: "month" },
            unit_amount: VENDOR_PLAN_PRICES[plan],
            product_data: { name: `Sada Vyah Vendor Plan — ${plan}` },
          },
          quantity: 1,
        },
      ],
      metadata: { vendorId, plan },
      success_url: `${process.env.WEB_URL}/vendor-dashboard/subscription?success=true`,
      cancel_url: `${process.env.WEB_URL}/vendor-dashboard/subscription?canceled=true`,
    });
    return { url: session.url };
  }

  async handleWebhookEvent(event: Stripe.Event) {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const { vendorId, plan } = session.metadata ?? {};
      if (vendorId && plan) {
        await this.prisma.subscription.upsert({
          where: { vendorId },
          create: { vendorId, plan: plan as never, status: "ACTIVE" },
          update: { plan: plan as never, status: "ACTIVE" },
        });
      }
    }
  }
}

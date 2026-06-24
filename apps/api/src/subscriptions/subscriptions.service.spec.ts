import Stripe from "stripe";
import { SubscriptionsService } from "./subscriptions.service";

describe("SubscriptionsService.constructWebhookEvent", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV, STRIPE_SECRET_KEY: "sk_test_123", STRIPE_WEBHOOK_SECRET: "whsec_test" };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("rejects a payload with an invalid signature", () => {
    const service = new SubscriptionsService(null as never);
    const payload = Buffer.from(JSON.stringify({ type: "checkout.session.completed" }));

    expect(() => service.constructWebhookEvent(payload, "t=1,v1=not-a-real-signature")).toThrow();
  });

  it("accepts a payload signed with the configured webhook secret", () => {
    const service = new SubscriptionsService(null as never);
    const payload = Buffer.from(JSON.stringify({ type: "checkout.session.completed" }));

    // Re-derive the signature the same way Stripe's SDK does, using the same
    // secret the service trusts, to prove a correctly-signed event is accepted.
    const stripe = (service as unknown as { stripe: Stripe }).stripe;
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payload.toString(),
      secret: "whsec_test",
    });

    expect(() => service.constructWebhookEvent(payload, header)).not.toThrow();
  });

  it("throws if STRIPE_WEBHOOK_SECRET is not configured", () => {
    delete process.env.STRIPE_WEBHOOK_SECRET;
    const service = new SubscriptionsService(null as never);
    expect(() => service.constructWebhookEvent(Buffer.from("{}"), "anything")).toThrow(
      "STRIPE_WEBHOOK_SECRET is not configured",
    );
  });
});

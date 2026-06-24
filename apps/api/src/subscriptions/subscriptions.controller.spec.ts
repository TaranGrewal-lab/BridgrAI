import { ForbiddenException } from "@nestjs/common";
import { SubscriptionsController } from "./subscriptions.controller";

describe("SubscriptionsController.createCheckoutSession", () => {
  it("rejects a checkout request for a vendor the caller doesn't own", async () => {
    const vendorsService = { findMine: jest.fn().mockResolvedValue({ id: "vendor-mine" }) };
    const subscriptionsService = { createCheckoutSession: jest.fn() };
    const controller = new SubscriptionsController(subscriptionsService as never, vendorsService as never);

    await expect(
      controller.createCheckoutSession({ clerkId: "user1" }, "vendor-someone-elses", "GOLD"),
    ).rejects.toThrow(ForbiddenException);
    expect(subscriptionsService.createCheckoutSession).not.toHaveBeenCalled();
  });

  it("allows a checkout request for the caller's own vendor", async () => {
    const vendorsService = { findMine: jest.fn().mockResolvedValue({ id: "vendor-mine" }) };
    const subscriptionsService = { createCheckoutSession: jest.fn().mockResolvedValue({ url: "https://stripe.test" }) };
    const controller = new SubscriptionsController(subscriptionsService as never, vendorsService as never);

    const result = await controller.createCheckoutSession({ clerkId: "user1" }, "vendor-mine", "GOLD");
    expect(result).toEqual({ url: "https://stripe.test" });
    expect(subscriptionsService.createCheckoutSession).toHaveBeenCalledWith("vendor-mine", "GOLD");
  });

  it("rejects if the caller has no vendor at all", async () => {
    const vendorsService = { findMine: jest.fn().mockResolvedValue(null) };
    const subscriptionsService = { createCheckoutSession: jest.fn() };
    const controller = new SubscriptionsController(subscriptionsService as never, vendorsService as never);

    await expect(
      controller.createCheckoutSession({ clerkId: "user1" }, "vendor-mine", "GOLD"),
    ).rejects.toThrow(ForbiddenException);
  });
});

import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { WeddingAccessService } from "./wedding-access.service";

function makePrismaMock() {
  return {
    user: { findUnique: jest.fn() },
    weddingMember: { findUnique: jest.fn() },
    event: { findUnique: jest.fn() },
    guest: { findUnique: jest.fn() },
    task: { findUnique: jest.fn() },
    budgetItem: { findUnique: jest.fn() },
    checklistItem: { findUnique: jest.fn() },
    guestInvite: { findUnique: jest.fn() },
  };
}

describe("WeddingAccessService", () => {
  it("rejects a user who has no account at all", async () => {
    const prisma = makePrismaMock();
    prisma.user.findUnique.mockResolvedValue(null);
    const service = new WeddingAccessService(prisma as never);

    await expect(service.assertWeddingMember("w1", "stranger")).rejects.toThrow(ForbiddenException);
  });

  it("rejects a logged-in user who is not a member of the wedding", async () => {
    const prisma = makePrismaMock();
    prisma.user.findUnique.mockResolvedValue({ id: "u1" });
    prisma.weddingMember.findUnique.mockResolvedValue(null);
    const service = new WeddingAccessService(prisma as never);

    await expect(service.assertWeddingMember("w1", "u1-clerk")).rejects.toThrow(ForbiddenException);
  });

  it("allows a member of the wedding", async () => {
    const prisma = makePrismaMock();
    prisma.user.findUnique.mockResolvedValue({ id: "u1" });
    prisma.weddingMember.findUnique.mockResolvedValue({ id: "m1" });
    const service = new WeddingAccessService(prisma as never);

    await expect(service.assertWeddingMember("w1", "u1-clerk")).resolves.toBeUndefined();
  });

  it("resolves an event back to its wedding before checking membership", async () => {
    const prisma = makePrismaMock();
    prisma.event.findUnique.mockResolvedValue({ id: "e1", weddingId: "w1" });
    prisma.user.findUnique.mockResolvedValue({ id: "u1" });
    prisma.weddingMember.findUnique.mockResolvedValue(null);
    const service = new WeddingAccessService(prisma as never);

    await expect(service.assertEventMember("e1", "someone-elses-clerk-id")).rejects.toThrow(
      ForbiddenException,
    );
    expect(prisma.weddingMember.findUnique).toHaveBeenCalledWith({
      where: { weddingId_userId: { weddingId: "w1", userId: "u1" } },
    });
  });

  it("404s instead of leaking a forbidden/not-found distinction for a nonexistent event", async () => {
    const prisma = makePrismaMock();
    prisma.event.findUnique.mockResolvedValue(null);
    const service = new WeddingAccessService(prisma as never);

    await expect(service.assertEventMember("missing", "any-clerk-id")).rejects.toThrow(NotFoundException);
  });
});

import { NotFoundException } from "@nestjs/common";
import { WebsitesService } from "./websites.service";

function makePrismaMock() {
  return {
    weddingWebsite: { findUnique: jest.fn() },
    event: { findMany: jest.fn() },
    guest: { findFirst: jest.fn(), create: jest.fn() },
    guestInvite: { upsert: jest.fn() },
  };
}

describe("WebsitesService.submitRsvp", () => {
  it("throws if the wedding site is not published", async () => {
    const prisma = makePrismaMock();
    prisma.weddingWebsite.findUnique.mockResolvedValue({ weddingId: "w1", isPublished: false });
    const service = new WebsitesService(prisma as never);

    await expect(
      service.submitRsvp("some-subdomain", {
        guestName: "Jas",
        eventIds: ["e1"],
        rsvpStatus: "ATTENDING",
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it("reuses an existing guest matched by case-insensitive name instead of creating a duplicate", async () => {
    const prisma = makePrismaMock();
    prisma.weddingWebsite.findUnique.mockResolvedValue({ weddingId: "w1", isPublished: true });
    prisma.event.findMany.mockResolvedValue([{ id: "e1" }]);
    prisma.guest.findFirst.mockResolvedValue({ id: "g1" });
    prisma.guestInvite.upsert.mockResolvedValue({});

    const service = new WebsitesService(prisma as never);
    await service.submitRsvp("some-subdomain", {
      guestName: "jas Kaur",
      eventIds: ["e1"],
      rsvpStatus: "ATTENDING",
    });

    expect(prisma.guest.create).not.toHaveBeenCalled();
    expect(prisma.guestInvite.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { guestId_eventId: { guestId: "g1", eventId: "e1" } },
      }),
    );
  });

  it("rejects event ids that don't belong to this wedding", async () => {
    const prisma = makePrismaMock();
    prisma.weddingWebsite.findUnique.mockResolvedValue({ weddingId: "w1", isPublished: true });
    prisma.event.findMany.mockResolvedValue([]); // none of the requested events matched this wedding
    const service = new WebsitesService(prisma as never);

    await expect(
      service.submitRsvp("some-subdomain", {
        guestName: "Jas",
        eventIds: ["someone-elses-event"],
        rsvpStatus: "ATTENDING",
      }),
    ).rejects.toThrow(NotFoundException);
  });
});

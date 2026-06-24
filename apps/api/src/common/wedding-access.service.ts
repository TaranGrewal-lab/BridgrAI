import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

// Every wedding-scoped resource (events, tasks, guests, budget items, etc.) is
// reachable by a logged-in user simply by knowing its id — Clerk auth alone
// only proves *someone* is logged in, not that they belong to this wedding.
// These helpers close that gap by walking each resource's foreign keys back
// to a Wedding and checking the caller has a WeddingMember row for it.
@Injectable()
export class WeddingAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async assertWeddingMember(weddingId: string, clerkId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { clerkId } });
    if (!user) throw new ForbiddenException("Not a member of this wedding");

    const membership = await this.prisma.weddingMember.findUnique({
      where: { weddingId_userId: { weddingId, userId: user.id } },
    });
    if (!membership) throw new ForbiddenException("Not a member of this wedding");
  }

  async assertEventMember(eventId: string, clerkId: string): Promise<void> {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException("Event not found");
    await this.assertWeddingMember(event.weddingId, clerkId);
  }

  async assertGuestMember(guestId: string, clerkId: string): Promise<void> {
    const guest = await this.prisma.guest.findUnique({ where: { id: guestId } });
    if (!guest) throw new NotFoundException("Guest not found");
    await this.assertWeddingMember(guest.weddingId, clerkId);
  }

  async assertTaskMember(taskId: string, clerkId: string): Promise<void> {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new NotFoundException("Task not found");
    await this.assertWeddingMember(task.weddingId, clerkId);
  }

  async assertBudgetItemMember(budgetItemId: string, clerkId: string): Promise<void> {
    const item = await this.prisma.budgetItem.findUnique({
      where: { id: budgetItemId },
      include: { event: true },
    });
    if (!item) throw new NotFoundException("Budget item not found");
    await this.assertWeddingMember(item.event.weddingId, clerkId);
  }

  async assertChecklistItemMember(checklistItemId: string, clerkId: string): Promise<void> {
    const item = await this.prisma.checklistItem.findUnique({
      where: { id: checklistItemId },
      include: { event: true },
    });
    if (!item) throw new NotFoundException("Checklist item not found");
    await this.assertWeddingMember(item.event.weddingId, clerkId);
  }

  async assertGuestInviteMember(inviteId: string, clerkId: string): Promise<void> {
    const invite = await this.prisma.guestInvite.findUnique({
      where: { id: inviteId },
      include: { guest: true },
    });
    if (!invite) throw new NotFoundException("Invite not found");
    await this.assertWeddingMember(invite.guest.weddingId, clerkId);
  }
}

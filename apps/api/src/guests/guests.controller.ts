import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GuestsService } from "./guests.service";
import { CreateGuestDto } from "./dto/create-guest.dto";
import { UpdateInviteDto } from "./dto/update-invite.dto";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";
import { CurrentUser, AuthUser } from "../common/decorators/current-user.decorator";
import { WeddingAccessService } from "../common/wedding-access.service";

@UseGuards(ClerkAuthGuard)
@Controller()
export class GuestsController {
  constructor(
    private readonly guestsService: GuestsService,
    private readonly weddingAccess: WeddingAccessService,
  ) {}

  @Get("weddings/:weddingId/guests")
  async findAll(@CurrentUser() user: AuthUser, @Param("weddingId") weddingId: string) {
    await this.weddingAccess.assertWeddingMember(weddingId, user.clerkId);
    return this.guestsService.findAllForWedding(weddingId);
  }

  @Post("weddings/:weddingId/guests")
  async create(@CurrentUser() user: AuthUser, @Param("weddingId") weddingId: string, @Body() dto: CreateGuestDto) {
    await this.weddingAccess.assertWeddingMember(weddingId, user.clerkId);
    return this.guestsService.create(weddingId, dto);
  }

  @Patch("guests/:id")
  async update(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() dto: Partial<CreateGuestDto>) {
    await this.weddingAccess.assertGuestMember(id, user.clerkId);
    return this.guestsService.update(id, dto);
  }

  @Delete("guests/:id")
  async remove(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    await this.weddingAccess.assertGuestMember(id, user.clerkId);
    return this.guestsService.remove(id);
  }

  @Get("guests/:id/invites")
  async getInvitesForGuest(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    await this.weddingAccess.assertGuestMember(id, user.clerkId);
    return this.guestsService.getInvitesForGuest(id);
  }

  @Get("events/:eventId/invites")
  async getInvitesForEvent(@CurrentUser() user: AuthUser, @Param("eventId") eventId: string) {
    await this.weddingAccess.assertEventMember(eventId, user.clerkId);
    return this.guestsService.getInvitesForEvent(eventId);
  }

  @Post("events/:eventId/invites")
  async assignGuestToEvent(
    @CurrentUser() user: AuthUser,
    @Param("eventId") eventId: string,
    @Body("guestId") guestId: string,
  ) {
    await this.weddingAccess.assertEventMember(eventId, user.clerkId);
    await this.weddingAccess.assertGuestMember(guestId, user.clerkId);
    return this.guestsService.assignGuestToEvent(guestId, eventId);
  }

  @Patch("invites/:id")
  async updateInvite(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() dto: UpdateInviteDto) {
    await this.weddingAccess.assertGuestInviteMember(id, user.clerkId);
    return this.guestsService.updateInvite(id, dto);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { GuestsService } from "./guests.service";
import { CreateGuestDto } from "./dto/create-guest.dto";
import { UpdateInviteDto } from "./dto/update-invite.dto";

@Controller()
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @Get("weddings/:weddingId/guests")
  findAll(@Param("weddingId") weddingId: string) {
    return this.guestsService.findAllForWedding(weddingId);
  }

  @Post("weddings/:weddingId/guests")
  create(@Param("weddingId") weddingId: string, @Body() dto: CreateGuestDto) {
    return this.guestsService.create(weddingId, dto);
  }

  @Patch("guests/:id")
  update(@Param("id") id: string, @Body() dto: Partial<CreateGuestDto>) {
    return this.guestsService.update(id, dto);
  }

  @Delete("guests/:id")
  remove(@Param("id") id: string) {
    return this.guestsService.remove(id);
  }

  @Get("guests/:id/invites")
  getInvitesForGuest(@Param("id") id: string) {
    return this.guestsService.getInvitesForGuest(id);
  }

  @Get("events/:eventId/invites")
  getInvitesForEvent(@Param("eventId") eventId: string) {
    return this.guestsService.getInvitesForEvent(eventId);
  }

  @Post("events/:eventId/invites")
  assignGuestToEvent(@Param("eventId") eventId: string, @Body("guestId") guestId: string) {
    return this.guestsService.assignGuestToEvent(guestId, eventId);
  }

  @Patch("invites/:id")
  updateInvite(@Param("id") id: string, @Body() dto: UpdateInviteDto) {
    return this.guestsService.updateInvite(id, dto);
  }
}

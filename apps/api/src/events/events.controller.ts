import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";
import { CurrentUser, AuthUser } from "../common/decorators/current-user.decorator";
import { WeddingAccessService } from "../common/wedding-access.service";

@UseGuards(ClerkAuthGuard)
@Controller()
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly weddingAccess: WeddingAccessService,
  ) {}

  @Get("weddings/:weddingId/events")
  async findAll(@CurrentUser() user: AuthUser, @Param("weddingId") weddingId: string) {
    await this.weddingAccess.assertWeddingMember(weddingId, user.clerkId);
    return this.eventsService.findAllForWedding(weddingId);
  }

  @Post("weddings/:weddingId/events")
  async create(@CurrentUser() user: AuthUser, @Param("weddingId") weddingId: string, @Body() dto: CreateEventDto) {
    await this.weddingAccess.assertWeddingMember(weddingId, user.clerkId);
    return this.eventsService.create(weddingId, dto);
  }

  @Post("events/:id/template")
  async applyTemplate(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    await this.weddingAccess.assertEventMember(id, user.clerkId);
    return this.eventsService.applyTemplate(id);
  }

  @Get("events/:id/checklist")
  async getChecklist(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    await this.weddingAccess.assertEventMember(id, user.clerkId);
    return this.eventsService.findChecklist(id);
  }

  @Post("events/:id/checklist")
  async addChecklistItem(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body("name") name: string) {
    await this.weddingAccess.assertEventMember(id, user.clerkId);
    return this.eventsService.createChecklistItem(id, name);
  }

  @Patch("checklist-items/:id")
  async updateChecklistItem(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body() data: { name?: string; notes?: string; isComplete?: boolean },
  ) {
    await this.weddingAccess.assertChecklistItemMember(id, user.clerkId);
    return this.eventsService.updateChecklistItem(id, data);
  }

  @Delete("checklist-items/:id")
  async removeChecklistItem(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    await this.weddingAccess.assertChecklistItemMember(id, user.clerkId);
    return this.eventsService.removeChecklistItem(id);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";

@UseGuards(ClerkAuthGuard)
@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("weddings/:weddingId/events")
  findAll(@Param("weddingId") weddingId: string) {
    return this.eventsService.findAllForWedding(weddingId);
  }

  @Post("weddings/:weddingId/events")
  create(@Param("weddingId") weddingId: string, @Body() dto: CreateEventDto) {
    return this.eventsService.create(weddingId, dto);
  }

  @Post("events/:id/template")
  applyTemplate(@Param("id") id: string) {
    return this.eventsService.applyTemplate(id);
  }

  @Get("events/:id/checklist")
  getChecklist(@Param("id") id: string) {
    return this.eventsService.findChecklist(id);
  }

  @Post("events/:id/checklist")
  addChecklistItem(@Param("id") id: string, @Body("name") name: string) {
    return this.eventsService.createChecklistItem(id, name);
  }

  @Patch("checklist-items/:id")
  updateChecklistItem(
    @Param("id") id: string,
    @Body() data: { name?: string; notes?: string; isComplete?: boolean },
  ) {
    return this.eventsService.updateChecklistItem(id, data);
  }

  @Delete("checklist-items/:id")
  removeChecklistItem(@Param("id") id: string) {
    return this.eventsService.removeChecklistItem(id);
  }
}

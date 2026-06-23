import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";

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
}

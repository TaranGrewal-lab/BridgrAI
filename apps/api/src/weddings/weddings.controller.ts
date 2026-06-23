import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { WeddingsService } from "./weddings.service";
import { CreateWeddingDto } from "./dto/create-wedding.dto";

@Controller("weddings")
export class WeddingsController {
  constructor(private readonly weddingsService: WeddingsService) {}

  @Post()
  create(@Body() dto: CreateWeddingDto) {
    // ownerId resolved from authenticated request user in production (Clerk guard)
    return this.weddingsService.create("current-user-id", dto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.weddingsService.findOne(id);
  }

  @Get(":id/dashboard")
  getDashboard(@Param("id") id: string) {
    return this.weddingsService.getDashboard(id);
  }
}

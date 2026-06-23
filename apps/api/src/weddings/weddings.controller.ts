import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { WeddingsService } from "./weddings.service";
import { CreateWeddingDto } from "./dto/create-wedding.dto";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";
import { CurrentUser, AuthUser } from "../common/decorators/current-user.decorator";

@UseGuards(ClerkAuthGuard)
@Controller("weddings")
export class WeddingsController {
  constructor(private readonly weddingsService: WeddingsService) {}

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateWeddingDto) {
    return this.weddingsService.createForClerkUser(user.clerkId, user.email, dto);
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

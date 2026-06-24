import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { WeddingsService } from "./weddings.service";
import { CreateWeddingDto } from "./dto/create-wedding.dto";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";
import { CurrentUser, AuthUser } from "../common/decorators/current-user.decorator";
import { WeddingAccessService } from "../common/wedding-access.service";

@UseGuards(ClerkAuthGuard)
@Controller("weddings")
export class WeddingsController {
  constructor(
    private readonly weddingsService: WeddingsService,
    private readonly weddingAccess: WeddingAccessService,
  ) {}

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateWeddingDto) {
    return this.weddingsService.createForClerkUser(user.clerkId, user.email, dto);
  }

  @Get("me")
  findMine(@CurrentUser() user: AuthUser) {
    return this.weddingsService.findMine(user.clerkId);
  }

  @Get(":id")
  async findOne(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    await this.weddingAccess.assertWeddingMember(id, user.clerkId);
    return this.weddingsService.findOne(id);
  }

  @Get(":id/dashboard")
  async getDashboard(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    await this.weddingAccess.assertWeddingMember(id, user.clerkId);
    return this.weddingsService.getDashboard(id);
  }
}

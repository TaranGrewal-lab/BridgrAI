import { Body, Controller, ForbiddenException, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { VendorsService } from "./vendors.service";
import { SearchVendorsDto } from "./dto/search-vendors.dto";
import { CreateVendorDto } from "./dto/create-vendor.dto";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";
import { CurrentUser, AuthUser } from "../common/decorators/current-user.decorator";

@Controller("vendors")
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  search(@Query() dto: SearchVendorsDto) {
    return this.vendorsService.search(dto);
  }

  @UseGuards(ClerkAuthGuard)
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateVendorDto) {
    return this.vendorsService.createForClerkUser(user.clerkId, user.email, dto);
  }

  @UseGuards(ClerkAuthGuard)
  @Get("me")
  findMine(@CurrentUser() user: AuthUser) {
    return this.vendorsService.findMine(user.clerkId);
  }

  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.vendorsService.findBySlug(slug);
  }

  // Logs a click/view for the vendor's own analytics dashboard.
  // Never creates a lead or notifies the vendor of a "request" — directory only.
  @Post(":id/analytics-event")
  logEvent(@Param("id") id: string, @Body("type") type: string) {
    return this.vendorsService.logAnalyticsEvent(id, type);
  }

  // Vendor's own dashboard data — not public, and only the owning vendor can see it.
  @UseGuards(ClerkAuthGuard)
  @Get(":id/analytics")
  async getAnalytics(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    const vendor = await this.vendorsService.findMine(user.clerkId);
    if (!vendor || vendor.id !== id) {
      throw new ForbiddenException("You can only view your own vendor analytics");
    }
    return this.vendorsService.getAnalytics(id);
  }
}

import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { VendorsService } from "./vendors.service";
import { SearchVendorsDto } from "./dto/search-vendors.dto";

@Controller("vendors")
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  search(@Query() dto: SearchVendorsDto) {
    return this.vendorsService.search(dto);
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

  @Get(":id/analytics")
  getAnalytics(@Param("id") id: string) {
    return this.vendorsService.getAnalytics(id);
  }
}

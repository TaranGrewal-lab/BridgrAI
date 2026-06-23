import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { WebsitesService } from "./websites.service";
import { UpdateWebsiteDto } from "./dto/update-website.dto";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";

@Controller()
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) {}

  @UseGuards(ClerkAuthGuard)
  @Get("weddings/:weddingId/website")
  get(@Param("weddingId") weddingId: string) {
    return this.websitesService.getOrCreate(weddingId);
  }

  @UseGuards(ClerkAuthGuard)
  @Patch("weddings/:weddingId/website")
  update(@Param("weddingId") weddingId: string, @Body() dto: UpdateWebsiteDto) {
    return this.websitesService.update(weddingId, dto);
  }

  // Public — rendered on the couple's published wedding site, no auth required.
  @Get("public/w/:subdomain")
  getPublic(@Param("subdomain") subdomain: string) {
    return this.websitesService.getPublic(subdomain);
  }
}

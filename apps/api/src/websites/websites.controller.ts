import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { WebsitesService } from "./websites.service";
import { UpdateWebsiteDto } from "./dto/update-website.dto";

@Controller()
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) {}

  @Get("weddings/:weddingId/website")
  get(@Param("weddingId") weddingId: string) {
    return this.websitesService.getOrCreate(weddingId);
  }

  @Patch("weddings/:weddingId/website")
  update(@Param("weddingId") weddingId: string, @Body() dto: UpdateWebsiteDto) {
    return this.websitesService.update(weddingId, dto);
  }

  @Get("public/w/:subdomain")
  getPublic(@Param("subdomain") subdomain: string) {
    return this.websitesService.getPublic(subdomain);
  }
}

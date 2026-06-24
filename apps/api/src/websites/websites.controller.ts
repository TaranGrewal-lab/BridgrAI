import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { WebsitesService } from "./websites.service";
import { UpdateWebsiteDto } from "./dto/update-website.dto";
import { SubmitRsvpDto } from "./dto/submit-rsvp.dto";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";
import { CurrentUser, AuthUser } from "../common/decorators/current-user.decorator";
import { WeddingAccessService } from "../common/wedding-access.service";

@Controller()
export class WebsitesController {
  constructor(
    private readonly websitesService: WebsitesService,
    private readonly weddingAccess: WeddingAccessService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Get("weddings/:weddingId/website")
  async get(@CurrentUser() user: AuthUser, @Param("weddingId") weddingId: string) {
    await this.weddingAccess.assertWeddingMember(weddingId, user.clerkId);
    return this.websitesService.getOrCreate(weddingId);
  }

  @UseGuards(ClerkAuthGuard)
  @Patch("weddings/:weddingId/website")
  async update(@CurrentUser() user: AuthUser, @Param("weddingId") weddingId: string, @Body() dto: UpdateWebsiteDto) {
    await this.weddingAccess.assertWeddingMember(weddingId, user.clerkId);
    return this.websitesService.update(weddingId, dto);
  }

  // Public — rendered on the couple's published wedding site, no auth required.
  @Get("public/w/:subdomain")
  getPublic(@Param("subdomain") subdomain: string) {
    return this.websitesService.getPublic(subdomain);
  }

  // Public — guests submit RSVPs directly from the published wedding site, no auth required.
  @Post("public/w/:subdomain/rsvp")
  submitRsvp(@Param("subdomain") subdomain: string, @Body() dto: SubmitRsvpDto) {
    return this.websitesService.submitRsvp(subdomain, dto);
  }
}

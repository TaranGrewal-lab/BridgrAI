import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@UseGuards(ClerkAuthGuard, AdminGuard)
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("couples")
  listCouples() {
    return this.adminService.listCouples();
  }

  @Get("vendors")
  listVendors() {
    return this.adminService.listVendors();
  }

  @Patch("vendors/:id/verify")
  verifyVendor(@Param("id") id: string, @Body("verification") verification: "VERIFIED" | "REJECTED" | "PENDING" | "UNVERIFIED") {
    return this.adminService.setVendorVerification(id, verification);
  }

  @Patch("vendors/:id/feature")
  featureVendor(@Param("id") id: string, @Body("isFeatured") isFeatured: boolean) {
    return this.adminService.setVendorFeatured(id, isFeatured);
  }

  @Get("reviews")
  listReviews() {
    return this.adminService.listReviews();
  }

  @Delete("reviews/:id")
  deleteReview(@Param("id") id: string) {
    return this.adminService.deleteReview(id);
  }

  @Get("subscriptions")
  listSubscriptions() {
    return this.adminService.listSubscriptions();
  }

  @Get("payments")
  listPayments() {
    return this.adminService.listPayments();
  }

  @Get("analytics/overview")
  getAnalyticsOverview() {
    return this.adminService.getAnalyticsOverview();
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  listCouples() {
    return this.prisma.wedding.findMany({ include: { members: { include: { user: true } } } });
  }

  listVendors() {
    return this.prisma.vendor.findMany({ include: { category: true, subscription: true } });
  }

  listReviews() {
    return this.prisma.review.findMany({ include: { vendor: true, user: true } });
  }

  deleteReview(id: string) {
    return this.prisma.review.delete({ where: { id } });
  }

  setVendorVerification(id: string, verification: "VERIFIED" | "REJECTED" | "PENDING" | "UNVERIFIED") {
    return this.prisma.vendor.update({ where: { id }, data: { verification } });
  }

  setVendorFeatured(id: string, isFeatured: boolean) {
    return this.prisma.vendor.update({ where: { id }, data: { isFeatured } });
  }

  listSubscriptions() {
    return this.prisma.subscription.findMany({ include: { vendor: true } });
  }

  listPayments() {
    return this.prisma.payment.findMany({ include: { subscription: { include: { vendor: true } } } });
  }

  getAnalyticsOverview() {
    return Promise.all([
      this.prisma.wedding.count(),
      this.prisma.vendor.count(),
      this.prisma.subscription.count({ where: { plan: { not: "FREE" } } }),
    ]).then(([weddings, vendors, paidVendors]) => ({ weddings, vendors, paidVendors }));
  }
}

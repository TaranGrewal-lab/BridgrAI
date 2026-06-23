import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { SearchVendorsDto } from "./dto/search-vendors.dto";

const PLAN_WEIGHT: Record<string, number> = { PLATINUM: 4, GOLD: 3, SILVER: 2, FREE: 1 };

@Injectable()
export class VendorsService {
  constructor(private readonly prisma: PrismaService) {}

  async search(dto: SearchVendorsDto) {
    const where: Prisma.VendorWhereInput = {
      ...(dto.category ? { category: { slug: dto.category } } : {}),
      ...(dto.city ? { city: { equals: dto.city, mode: "insensitive" } } : {}),
      ...(dto.rating ? { ratingAverage: { gte: Number(dto.rating) } } : {}),
      ...(dto.q ? { businessName: { contains: dto.q, mode: "insensitive" } } : {}),
    };

    const vendors = await this.prisma.vendor.findMany({
      where,
      include: { category: true, subscription: true },
    });

    // Plan-weighted ranking always applied first; sort param breaks ties within plan tier.
    return vendors.sort((a, b) => {
      const planDiff = (PLAN_WEIGHT[b.subscription?.plan ?? "FREE"] ?? 1) -
        (PLAN_WEIGHT[a.subscription?.plan ?? "FREE"] ?? 1);
      if (planDiff !== 0) return planDiff;
      if (dto.sort === "newest") return b.createdAt.getTime() - a.createdAt.getTime();
      return Number(b.ratingAverage) - Number(a.ratingAverage);
    });
  }

  findBySlug(slug: string) {
    return this.prisma.vendor.findUniqueOrThrow({
      where: { slug },
      include: { category: true, photos: true, reviews: true, subscription: true },
    });
  }

  logAnalyticsEvent(vendorId: string, type: string) {
    return this.prisma.vendorAnalyticsEvent.create({ data: { vendorId, type } });
  }

  getAnalytics(vendorId: string) {
    return this.prisma.vendorAnalyticsEvent.groupBy({
      by: ["type"],
      where: { vendorId },
      _count: true,
    });
  }
}

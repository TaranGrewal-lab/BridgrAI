import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateBlogPostDto,
  CreateGalleryImageDto,
  CreateVendorCategoryDto,
  UpdateBlogPostDto,
  UpdateCmsPageDto,
} from "./dto/content.dto";

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  listGalleryImages(category?: string) {
    return this.prisma.galleryImage.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }

  createGalleryImage(dto: CreateGalleryImageDto) {
    return this.prisma.galleryImage.create({ data: dto });
  }

  removeGalleryImage(id: string) {
    return this.prisma.galleryImage.delete({ where: { id } });
  }

  listBlogPosts() {
    return this.prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  }

  getBlogPost(slug: string) {
    return this.prisma.blogPost.findUniqueOrThrow({ where: { slug } });
  }

  createBlogPost(dto: CreateBlogPostDto) {
    return this.prisma.blogPost.create({ data: dto });
  }

  updateBlogPost(id: string, dto: UpdateBlogPostDto) {
    return this.prisma.blogPost.update({ where: { id }, data: dto });
  }

  publishBlogPost(id: string) {
    return this.prisma.blogPost.update({ where: { id }, data: { publishedAt: new Date() } });
  }

  removeBlogPost(id: string) {
    return this.prisma.blogPost.delete({ where: { id } });
  }

  listCmsPages() {
    return this.prisma.cmsPage.findMany({ orderBy: { slug: "asc" } });
  }

  updateCmsPage(slug: string, dto: UpdateCmsPageDto) {
    return this.prisma.cmsPage.upsert({
      where: { slug },
      update: dto,
      create: { slug, title: dto.title ?? slug, content: dto.content ?? "" },
    });
  }

  listVendorCategories() {
    return this.prisma.vendorCategory.findMany({ orderBy: { name: "asc" } });
  }

  createVendorCategory(dto: CreateVendorCategoryDto) {
    return this.prisma.vendorCategory.create({ data: dto });
  }

  removeVendorCategory(id: string) {
    return this.prisma.vendorCategory.delete({ where: { id } });
  }
}

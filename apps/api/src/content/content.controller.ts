import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ContentService } from "./content.service";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import {
  CreateBlogPostDto,
  CreateGalleryImageDto,
  CreateVendorCategoryDto,
  UpdateBlogPostDto,
  UpdateCmsPageDto,
} from "./dto/content.dto";

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // Public — powers the inspiration gallery pages.
  @Get("gallery")
  listGalleryImages(@Query("category") category?: string) {
    return this.contentService.listGalleryImages(category);
  }

  @UseGuards(ClerkAuthGuard, AdminGuard)
  @Post("admin/gallery")
  createGalleryImage(@Body() dto: CreateGalleryImageDto) {
    return this.contentService.createGalleryImage(dto);
  }

  @UseGuards(ClerkAuthGuard, AdminGuard)
  @Delete("admin/gallery/:id")
  removeGalleryImage(@Param("id") id: string) {
    return this.contentService.removeGalleryImage(id);
  }

  // Public — powers the blog index/article pages.
  @Get("blog")
  listBlogPosts() {
    return this.contentService.listBlogPosts();
  }

  @Get("blog/:slug")
  getBlogPost(@Param("slug") slug: string) {
    return this.contentService.getBlogPost(slug);
  }

  @UseGuards(ClerkAuthGuard, AdminGuard)
  @Post("admin/blog")
  createBlogPost(@Body() dto: CreateBlogPostDto) {
    return this.contentService.createBlogPost(dto);
  }

  @UseGuards(ClerkAuthGuard, AdminGuard)
  @Patch("admin/blog/:id")
  updateBlogPost(@Param("id") id: string, @Body() dto: UpdateBlogPostDto) {
    return this.contentService.updateBlogPost(id, dto);
  }

  @UseGuards(ClerkAuthGuard, AdminGuard)
  @Patch("admin/blog/:id/publish")
  publishBlogPost(@Param("id") id: string) {
    return this.contentService.publishBlogPost(id);
  }

  @UseGuards(ClerkAuthGuard, AdminGuard)
  @Delete("admin/blog/:id")
  removeBlogPost(@Param("id") id: string) {
    return this.contentService.removeBlogPost(id);
  }

  @UseGuards(ClerkAuthGuard, AdminGuard)
  @Get("admin/cms-pages")
  listCmsPages() {
    return this.contentService.listCmsPages();
  }

  @UseGuards(ClerkAuthGuard, AdminGuard)
  @Patch("admin/cms-pages/:slug")
  updateCmsPage(@Param("slug") slug: string, @Body() dto: UpdateCmsPageDto) {
    return this.contentService.updateCmsPage(slug, dto);
  }

  // Public — powers vendor search/category filters.
  @Get("vendor-categories")
  listVendorCategories() {
    return this.contentService.listVendorCategories();
  }

  @UseGuards(ClerkAuthGuard, AdminGuard)
  @Post("admin/vendor-categories")
  createVendorCategory(@Body() dto: CreateVendorCategoryDto) {
    return this.contentService.createVendorCategory(dto);
  }

  @UseGuards(ClerkAuthGuard, AdminGuard)
  @Delete("admin/vendor-categories/:id")
  removeVendorCategory(@Param("id") id: string) {
    return this.contentService.removeVendorCategory(id);
  }
}

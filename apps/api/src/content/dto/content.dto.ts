import { IsOptional, IsString } from "class-validator";

export class CreateGalleryImageDto {
  @IsString() category!: string;
  @IsString() imageUrl!: string;
  @IsOptional() @IsString() caption?: string;
  @IsOptional() @IsString() vendorId?: string;
}

export class CreateBlogPostDto {
  @IsString() slug!: string;
  @IsString() title!: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsString() body!: string;
  @IsOptional() @IsString() coverImage?: string;
}

export class UpdateBlogPostDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsOptional() @IsString() body?: string;
  @IsOptional() @IsString() coverImage?: string;
}

export class UpdateCmsPageDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() content?: string;
}

export class CreateVendorCategoryDto {
  @IsString() name!: string;
  @IsString() slug!: string;
  @IsOptional() @IsString() icon?: string;
}

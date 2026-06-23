import { IsOptional, IsString, IsNumberString, IsIn } from "class-validator";

export const VENDOR_SORTS = ["rating", "popular", "newest", "featured"] as const;

export class SearchVendorsDto {
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsNumberString() priceMin?: string;
  @IsOptional() @IsNumberString() priceMax?: string;
  @IsOptional() @IsNumberString() rating?: string;
  @IsOptional() @IsString() q?: string;
  @IsOptional() @IsIn(VENDOR_SORTS) sort?: typeof VENDOR_SORTS[number];
}

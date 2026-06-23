import { IsOptional, IsString } from "class-validator";

export class CreateVendorDto {
  @IsString() businessName!: string;
  @IsString() categoryId!: string;
  @IsString() country!: string;
  @IsString() city!: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() websiteUrl?: string;
  @IsOptional() @IsString() instagramUrl?: string;
}

import { IsString, IsOptional, IsBoolean } from "class-validator";

export class UpdateWebsiteDto {
  @IsOptional() @IsString() theme?: string;
  @IsOptional() @IsString() storyContent?: string;
  @IsOptional() @IsString() venueInfo?: string;
  @IsOptional() @IsString() mapEmbedUrl?: string;
  @IsOptional() @IsString() accommodation?: string;
  @IsOptional() @IsBoolean() isPublished?: boolean;
}

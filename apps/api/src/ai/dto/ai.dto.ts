import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class ChecklistRequestDto {
  @IsString() eventType!: string;
}

export class BudgetRecommendationDto {
  @IsNumber() totalBudget!: number;
  @IsArray() eventTypes!: string[];
}

export class GuestGroupingDto {
  @IsArray() guests!: { id: string; relationship?: string; side?: string; tags?: string[] }[];
}

export class VendorRecommendationDto {
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() city?: string;
  @IsArray() candidates!: { id: string; name: string; ratingAverage?: number }[];
}

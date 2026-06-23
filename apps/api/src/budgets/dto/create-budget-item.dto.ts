import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateBudgetItemDto {
  @IsString() name!: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsNumber() estimatedCost?: number;
  @IsOptional() @IsNumber() actualCost?: number;
  @IsOptional() @IsNumber() depositPaid?: number;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsString() vendorId?: string;
}

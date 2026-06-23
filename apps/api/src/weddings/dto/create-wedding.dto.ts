import { IsOptional, IsString, IsDateString, IsNumber } from "class-validator";

export class CreateWeddingDto {
  @IsOptional() @IsString() brideName?: string;
  @IsOptional() @IsString() groomName?: string;
  @IsOptional() @IsDateString() weddingDate?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsNumber() totalBudget?: number;
  @IsOptional() @IsString() currency?: string;
}

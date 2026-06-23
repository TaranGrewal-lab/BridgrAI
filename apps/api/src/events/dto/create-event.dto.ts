import { IsString, IsOptional, IsDateString, IsNumber, IsIn } from "class-validator";

export const WEDDING_SIDES = ["BRIDE", "GROOM", "SHARED"] as const;

export class CreateEventDto {
  @IsString() name!: string;
  @IsString() eventType!: string;
  @IsIn(WEDDING_SIDES) side!: typeof WEDDING_SIDES[number];
  @IsOptional() @IsDateString() date?: string;
  @IsOptional() @IsString() venueName?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsNumber() budget?: number;
}

import { IsString, IsOptional, IsIn, IsArray } from "class-validator";
import { WEDDING_SIDES } from "../../events/dto/create-event.dto";

export class CreateGuestDto {
  @IsString() name!: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() relationship?: string;
  @IsOptional() @IsIn(WEDDING_SIDES) side?: typeof WEDDING_SIDES[number];
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsArray() tags?: string[];
}

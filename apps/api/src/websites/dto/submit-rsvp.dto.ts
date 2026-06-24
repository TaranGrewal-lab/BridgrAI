import { IsArray, IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class SubmitRsvpDto {
  @IsString() guestName!: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsArray() @IsString({ each: true }) eventIds!: string[];
  @IsIn(["ATTENDING", "DECLINED"]) rsvpStatus!: "ATTENDING" | "DECLINED";
  @IsOptional() @IsInt() @Min(0) plusOnes?: number;
  @IsOptional() @IsString() mealPreference?: string;
}

import { IsBoolean, IsIn, IsInt, IsOptional, IsString } from "class-validator";

export const RSVP_STATUSES = ["ATTENDING", "DECLINED", "PENDING", "NOT_INVITED"] as const;

export class UpdateInviteDto {
  @IsOptional() @IsBoolean() isInvited?: boolean;
  @IsOptional() @IsIn(RSVP_STATUSES) rsvpStatus?: typeof RSVP_STATUSES[number];
  @IsOptional() @IsString() mealPreference?: string;
  @IsOptional() @IsString() specialRequirements?: string;
  @IsOptional() @IsInt() plusOnes?: number;
}

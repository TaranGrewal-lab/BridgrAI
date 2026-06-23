import { IsString, IsOptional, IsIn, IsDateString } from "class-validator";

export const TASK_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;
export const TASK_STATUSES = ["TODO", "IN_PROGRESS", "DONE"] as const;

export class CreateTaskDto {
  @IsString() title!: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsIn(TASK_PRIORITIES) priority?: typeof TASK_PRIORITIES[number];
  @IsOptional() @IsIn(TASK_STATUSES) status?: typeof TASK_STATUSES[number];
  @IsOptional() @IsDateString() dueDate?: string;
}

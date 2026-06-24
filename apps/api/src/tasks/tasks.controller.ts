import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";
import { CurrentUser, AuthUser } from "../common/decorators/current-user.decorator";
import { WeddingAccessService } from "../common/wedding-access.service";

@UseGuards(ClerkAuthGuard)
@Controller()
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly weddingAccess: WeddingAccessService,
  ) {}

  @Get("weddings/:weddingId/tasks")
  async findAll(@CurrentUser() user: AuthUser, @Param("weddingId") weddingId: string) {
    await this.weddingAccess.assertWeddingMember(weddingId, user.clerkId);
    return this.tasksService.findAllForWedding(weddingId);
  }

  @Post("weddings/:weddingId/tasks")
  async create(@CurrentUser() user: AuthUser, @Param("weddingId") weddingId: string, @Body() dto: CreateTaskDto) {
    await this.weddingAccess.assertWeddingMember(weddingId, user.clerkId);
    return this.tasksService.create(weddingId, dto);
  }

  @Patch("tasks/:id")
  async update(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() dto: Partial<CreateTaskDto>) {
    await this.weddingAccess.assertTaskMember(id, user.clerkId);
    return this.tasksService.update(id, dto);
  }

  @Delete("tasks/:id")
  async remove(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    await this.weddingAccess.assertTaskMember(id, user.clerkId);
    return this.tasksService.remove(id);
  }
}

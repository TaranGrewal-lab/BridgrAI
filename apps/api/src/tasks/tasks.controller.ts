import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get("weddings/:weddingId/tasks")
  findAll(@Param("weddingId") weddingId: string) {
    return this.tasksService.findAllForWedding(weddingId);
  }

  @Post("weddings/:weddingId/tasks")
  create(@Param("weddingId") weddingId: string, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(weddingId, dto);
  }

  @Patch("tasks/:id")
  update(@Param("id") id: string, @Body() dto: Partial<CreateTaskDto>) {
    return this.tasksService.update(id, dto);
  }

  @Delete("tasks/:id")
  remove(@Param("id") id: string) {
    return this.tasksService.remove(id);
  }
}

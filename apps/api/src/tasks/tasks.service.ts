import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  findAllForWedding(weddingId: string) {
    return this.prisma.task.findMany({ where: { weddingId }, orderBy: { dueDate: "asc" } });
  }

  create(weddingId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: { ...dto, weddingId, dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined },
    });
  }

  update(id: string, dto: Partial<CreateTaskDto>) {
    return this.prisma.task.update({
      where: { id },
      data: { ...dto, dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined },
    });
  }

  remove(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}

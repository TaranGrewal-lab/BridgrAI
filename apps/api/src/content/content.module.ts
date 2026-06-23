import { Module } from "@nestjs/common";
import { ContentController } from "./content.controller";
import { ContentService } from "./content.service";
import { AdminGuard } from "../common/guards/admin.guard";

@Module({
  controllers: [ContentController],
  providers: [ContentService, AdminGuard],
})
export class ContentModule {}

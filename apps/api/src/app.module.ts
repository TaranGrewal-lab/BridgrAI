import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { WeddingAccessModule } from "./common/wedding-access.module";
import { WeddingsModule } from "./weddings/weddings.module";
import { EventsModule } from "./events/events.module";
import { VendorsModule } from "./vendors/vendors.module";
import { SubscriptionsModule } from "./subscriptions/subscriptions.module";
import { GuestsModule } from "./guests/guests.module";
import { BudgetsModule } from "./budgets/budgets.module";
import { TasksModule } from "./tasks/tasks.module";
import { WebsitesModule } from "./websites/websites.module";
import { AiModule } from "./ai/ai.module";
import { AdminModule } from "./admin/admin.module";
import { ContentModule } from "./content/content.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    WeddingAccessModule,
    WeddingsModule,
    EventsModule,
    VendorsModule,
    SubscriptionsModule,
    GuestsModule,
    BudgetsModule,
    TasksModule,
    WebsitesModule,
    AiModule,
    AdminModule,
    ContentModule,
  ],
})
export class AppModule {}

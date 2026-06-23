import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { WeddingsModule } from "./weddings/weddings.module";
import { EventsModule } from "./events/events.module";
import { VendorsModule } from "./vendors/vendors.module";
import { SubscriptionsModule } from "./subscriptions/subscriptions.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    WeddingsModule,
    EventsModule,
    VendorsModule,
    SubscriptionsModule,
  ],
})
export class AppModule {}

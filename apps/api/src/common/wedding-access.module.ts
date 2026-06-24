import { Global, Module } from "@nestjs/common";
import { WeddingAccessService } from "./wedding-access.service";

@Global()
@Module({
  providers: [WeddingAccessService],
  exports: [WeddingAccessService],
})
export class WeddingAccessModule {}

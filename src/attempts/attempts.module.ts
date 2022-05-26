import { Module } from "@nestjs/common";
import { AttemptsService } from "./attempts.service";
import { AttemptsController } from "./attempts.controller";
import { ElasticModule } from "../database/elastisearch.module";
import { ATTEMPTS_REPOSITORY_TOKEN } from "./contants";
import { AttemptsRepository } from "./attempts.repository";

@Module({
  imports: [ElasticModule],
  controllers: [AttemptsController],
  providers: [
    AttemptsService,
    {
      provide: ATTEMPTS_REPOSITORY_TOKEN,
      useClass: AttemptsRepository,
    },
  ],
  exports: [
    {
      provide: ATTEMPTS_REPOSITORY_TOKEN,
      useClass: AttemptsRepository,
    },
  ],
})
export class AttemptsModule {}

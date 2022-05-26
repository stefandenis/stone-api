import { Module } from "@nestjs/common";
import { StoneController } from "./stone.controller";
import { StoneService } from "./stone.service";
import { StoneRepository } from "./stone.repository";
import { STONE_REPOSITORY_TOKEN } from "./constants";
import { ElasticModule } from "../database/elastisearch.module";

@Module({
  imports: [ElasticModule],
  controllers: [StoneController],
  providers: [
    {
      provide: STONE_REPOSITORY_TOKEN,
      useClass: StoneRepository,
    },
    StoneService,
  ],
  exports: [
    {
      provide: STONE_REPOSITORY_TOKEN,
      useClass: StoneRepository,
    },
  ],
})
export class StoneModule {}

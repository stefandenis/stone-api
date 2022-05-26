import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StoneModule } from "./stone/stone.module";
import { ElasticModule } from "./database/elastisearch.module";
import { QuizModule } from "./quiz/quiz.module";
import { AttemptsModule } from "./attempts/attempts.module";

@Module({
  imports: [StoneModule, QuizModule, ElasticModule, AttemptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { QuizController } from "./quiz.controller";
import { QuizService } from "./quiz.service";
import { StoneModule } from "../stone/stone.module";
import { AttemptsModule } from "../attempts/attempts.module";

@Module({
  imports: [StoneModule, AttemptsModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}

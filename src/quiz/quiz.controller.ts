import { Body, Controller, Get, Post } from "@nestjs/common";
import { Quiz } from "./domain/Quiz";
import { QuizService } from "./quiz.service";
import { QuizAnswersRequest } from "./dto/QuizAnswersRequest";
import { ScoreResponse } from "./dto/ScoreResponse";
import { QuizMapper } from "./quiz.mapper";
import { Score } from "./domain/Score";
import { IndexResponse } from "@elastic/elasticsearch/lib/api/types";
import { QuizResultResponse } from "./dto/QuizResultResponse";
import { QuizResult } from "./domain/QuizResult";
import { AttemptsMapper } from "../attempts/attempts.mapper";

@Controller("quiz")
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getQuiz(): Promise<Quiz> {
    return await this.quizService.getQuiz();
  }

  @Post()
  async verifyQuiz(
    @Body() body: QuizAnswersRequest,
  ): Promise<QuizResultResponse> {
    const quizResult: QuizResult = await this.quizService.verifyQuiz(
      QuizMapper.mapQuizAnswersRequestToQuizAnswers(body),
    );
    return AttemptsMapper.mapQuizResultToQuizResultResponse(quizResult);
  }
}

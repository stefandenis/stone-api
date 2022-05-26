import {
  IndexResponse,
  SearchHit,
  SearchResponseBody,
} from "@elastic/elasticsearch/lib/api/types";
import { QuizResult } from "../quiz/domain/QuizResult";
import { QuizResultResponse } from "../quiz/dto/QuizResultResponse";
import { Attempt } from "./domain/Attempt";

export class AttemptsMapper {
  static mapIndexResponseToQuizResult(result: IndexResponse): QuizResult {
    return new QuizResult().setAttemptId(result._id);
  }

  static mapQuizResultToQuizResultResponse(
    quizResult: QuizResult,
  ): QuizResultResponse {
    return new QuizResultResponse().setAttemptId(quizResult.attemptId);
  }

  static mapSearchBodyResponsetoAttempt(result: SearchResponseBody): Attempt {
    const hit: SearchHit<Attempt> = result.hits.hits[0] as SearchHit<Attempt>;
    const attempt: Attempt = new Attempt()
      .setScore(hit._source.score)
      .setMaxScore(hit._source.maxScore)
      .setUsername(hit._source.username)
      .setQuizFeedback(hit._source.quizFeedback);
    return attempt;
  }
}

import {
  FullQuestionRequest,
  QuizAnswersRequest,
} from "./dto/QuizAnswersRequest";
import { QuizAnswers } from "./domain/QuizAnswers";
import { ScoreResponse } from "./dto/ScoreResponse";
import { Score } from "./domain/Score";
import { QuestionsData } from "./domain/QuestionsData";
import { FullQuestion } from "./domain/FullQuestion";

export class QuizMapper {
  static mapQuizAnswersRequestToQuizAnswers(
    quizAnswersRequest: QuizAnswersRequest,
  ): QuizAnswers {
    const questionsData = new QuestionsData().setFullQuestions(
      quizAnswersRequest.quiz.questions.map(
        (fullQuestionRequest: FullQuestionRequest) => {
          return QuizMapper.mapFullQuestionRequestToFullQuestion(
            fullQuestionRequest,
          );
        },
      ),
    );
    return new QuizAnswers()
      .setUsername(quizAnswersRequest.username)
      .setQuiz(questionsData);
  }

  static mapFullQuestionRequestToFullQuestion(
    fullQuestionRequest: FullQuestionRequest,
  ) {
    return new FullQuestion()
      .setChosenAnswer(fullQuestionRequest.chosen_answer)
      .setPossibleAnswers(fullQuestionRequest.possible_answers)
      .setStoneId(fullQuestionRequest.stone_id);
  }
}

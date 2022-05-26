import { StoneRepository } from "../stone/stone.repository";
import { Quiz } from "./domain/Quiz";
import { randomUUID } from "crypto";
import { Stone } from "../stone/domain/Stone";
import { Question } from "../question/domain/Question";
import { Inject } from "@nestjs/common";
import { StoneInterfaceRepository } from "../stone/stone.interface.repository";
import { shuffleArray } from "../shared/utils";
import { STONE_REPOSITORY_TOKEN } from "../stone/constants";
import { QuizAnswers } from "./domain/QuizAnswers";
import { Score } from "./domain/Score";
import { Answer } from "./domain/Answer";
import { QuestionMistake } from "./domain/QuestionsMistakes";
import { FullQuestion } from "./domain/FullQuestion";
import { ATTEMPTS_REPOSITORY_TOKEN } from "../attempts/contants";
import { AttemptsInterfaceRepository } from "../attempts/attempts.interface.repository";
import { Attempt } from "../attempts/domain/Attempt";
import { IndexResponse } from "@elastic/elasticsearch/lib/api/types";
import { QuizResult } from "./domain/QuizResult";

const NUMBER_OF_ANSWERS = 4;
const DEFAULT_NUMBER_OF_QUESTIONS = 10;
export class QuizService {
  constructor(
    @Inject(STONE_REPOSITORY_TOKEN)
    private stoneRepository: StoneInterfaceRepository,
    @Inject(ATTEMPTS_REPOSITORY_TOKEN)
    private attemptsRepository: AttemptsInterfaceRepository,
  ) {
  }

  async getQuiz(): Promise<Quiz> {
    const quiz_size = 10;
    const quiz_seed = randomUUID();
    const stones: Stone[] = await this.stoneRepository.getRandomStones(
      quiz_size,
      quiz_seed,
    );
    const wrong_answers = await this.stoneRepository.getAnswers(
      stones.map((stone: Stone) => {
        return stone.id;
      }),
      (NUMBER_OF_ANSWERS - 1) * 30,
    );

    const questions: Question[] = stones.map((stone: Stone, index: number) => {
      return new Question()
        .setStoneId(stone.id)
        .setStoneImage(stone.image_path)
        .setAnswers(
          shuffleArray([
            stone.stone_name,
            ...wrong_answers.slice(index * 3, index * 3 + 3),
          ]),
        );
    });
    return new Quiz().setQuestions(questions);
  }

  async verifyQuiz(quizAnswers: QuizAnswers): Promise<QuizResult> {
    let score = 0;
    const questionsMistakes: QuestionMistake[] = [];
    for (const question of quizAnswers.quiz.fullQuestions) {
      const stone: Stone = await this.stoneRepository.getStoneById(
        question.stoneId,
      );
      if (stone.stone_name === question.chosenAnswer) {
        score++;
      }
      questionsMistakes.push(
        new QuestionMistake()
          .setStoneId(stone.id)
          .setCorrectAnswer(stone.stone_name)
          .setChosenAnswer(question.chosenAnswer)
          .setPossibleAnswers(question.possibleAnswers),
      );
    }
    return await this.attemptsRepository.insertAttempt(
      new Attempt()
        .setScore(score)
        .setMaxScore(DEFAULT_NUMBER_OF_QUESTIONS)
        .setQuizFeedback(questionsMistakes)
        .setUsername(quizAnswers.username),
    );
  }
}

import { Stone } from "./domain/Stone";
import { Page } from "../shared/Page";
import { Score } from "../quiz/domain/Score";
import { QuestionMistake } from "../quiz/domain/QuestionsMistakes";

export interface StoneInterfaceRepository {
  getStones(
    offset: number,
    pageSize: number,
    totalElements: number,
  ): Promise<Page<Stone[]>>;
  countStones(): Promise<number>;
  getRandomStones(size: number, seed: string): Promise<Stone[]>;
  getAnswers(stoneIdsInQuiz: string[], size: number): Promise<string[]>;
  getStoneById(stoneId: string): Promise<Stone>;
  // insertScore(score: Score, quizMistakes: QuestionMistake[]);
}

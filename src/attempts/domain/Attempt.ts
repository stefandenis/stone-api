import { QuestionMistake } from "../../quiz/domain/QuestionsMistakes";

export class Attempt {
  score: number;
  maxScore: number;
  quizFeedback: QuestionMistake[];
  username: string;

  setScore(score: number) {
    this.score = score;
    return this;
  }

  setMaxScore(maxScore: number) {
    this.maxScore = maxScore;
    return this;
  }

  setQuizFeedback(quizFeedback: QuestionMistake[]) {
    this.quizFeedback = quizFeedback;
    return this;
  }

  setUsername(username: string) {
    this.username = username;
    return this;
  }
}

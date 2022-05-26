import { QuestionsData } from "./QuestionsData";

export class QuizAnswers {
  username: string;
  quiz: QuestionsData;

  setUsername(username: string) {
    this.username = username;
    return this;
  }

  setQuiz(quiz: QuestionsData) {
    this.quiz = quiz;
    return this;
  }
}

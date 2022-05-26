import { Question } from "../../question/domain/Question";

export class Quiz {
  questions: Question[];

  setQuestions(questions) {
    this.questions = questions;
    return this;
  }
}

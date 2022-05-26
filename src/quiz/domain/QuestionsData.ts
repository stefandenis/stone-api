import { FullQuestion } from "./FullQuestion";

export class QuestionsData {
  fullQuestions: FullQuestion[];

  setFullQuestions(fullquestions: FullQuestion[]) {
    this.fullQuestions = fullquestions;
    return this;
  }
}

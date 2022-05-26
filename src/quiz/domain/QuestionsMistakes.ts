export class QuestionMistake {
  stoneId: string;
  correctAnswer: string;
  chosenAnswer: string;
  possibleAnswers: string[];

  setStoneId(stoneId: string) {
    this.stoneId = stoneId;
    return this;
  }

  setCorrectAnswer(correctAnswer: string) {
    this.correctAnswer = correctAnswer;
    return this;
  }

  setChosenAnswer(chosenAnswer: string) {
    this.chosenAnswer = chosenAnswer;
    return this;
  }

  setPossibleAnswers(possibleAnswers: string[]) {
    this.possibleAnswers = possibleAnswers;
    return this;
  }
}

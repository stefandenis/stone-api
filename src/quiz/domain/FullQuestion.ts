export class FullQuestion {
  stoneId: string;
  chosenAnswer: string;
  possibleAnswers: string[];

  setStoneId(stoneId: string) {
    this.stoneId = stoneId;
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

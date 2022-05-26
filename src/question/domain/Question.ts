export class Question {
  stoneId: string;
  stoneImage: string;
  answers: string[];

  setStoneId(stoneId) {
    this.stoneId = stoneId;
    return this;
  }

  setStoneImage(stoneImage) {
    this.stoneImage = stoneImage;
    return this;
  }

  setAnswers(answers) {
    this.answers = answers;
    return this;
  }
}

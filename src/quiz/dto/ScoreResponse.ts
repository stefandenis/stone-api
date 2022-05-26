export class ScoreResponse {
  attemptId: string;

  setAttemptId(attemptId) {
    this.attemptId = attemptId;
    return this;
  }
}

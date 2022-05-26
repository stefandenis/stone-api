export class AttemptRequest {
  attemptId: string;

  setAttemptId(attemptId: string) {
    this.attemptId = attemptId;
    return this;
  }
}

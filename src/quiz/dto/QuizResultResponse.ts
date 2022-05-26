export class QuizResultResponse {
  attempt_id: string;

  setAttemptId(attemptId: string) {
    this.attempt_id = attemptId;
    return this;
  }
}

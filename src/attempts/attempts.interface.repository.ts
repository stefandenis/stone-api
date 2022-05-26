import { QuizResult } from "../quiz/domain/QuizResult";
import { Attempt } from "./domain/Attempt";

export interface AttemptsInterfaceRepository {
  getAttempt(id: string): Promise<Attempt>;
  insertAttempt(Attempt): Promise<QuizResult>;
}

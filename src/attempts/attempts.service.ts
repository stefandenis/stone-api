import { Inject, Injectable } from "@nestjs/common";
import { AttemptsRepository } from "./attempts.repository";
import { Attempt } from "./domain/Attempt";
import { ATTEMPTS_REPOSITORY_TOKEN } from "./contants";

@Injectable()
export class AttemptsService {
  constructor(
    @Inject(ATTEMPTS_REPOSITORY_TOKEN)
    private readonly attemptsRepository: AttemptsRepository,
  ) {}
  async getAttempt(attemptId: string): Promise<Attempt> {
    return await this.attemptsRepository.getAttempt(attemptId);
  }
}

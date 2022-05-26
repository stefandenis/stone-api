import { Controller, Get, Param, Query } from "@nestjs/common";
import { AttemptsService } from "./attempts.service";
import { Attempt } from "./domain/Attempt";

@Controller()
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Get("/attempt/:id")
  async getAttempt(@Param("id") attemptId): Promise<Attempt> {
    const attempt: Attempt = await this.attemptsService.getAttempt(attemptId);
    return attempt;
  }
}

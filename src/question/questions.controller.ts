import { Controller, Get } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get("/question")
  getQuestion() {
    return this.questionsService.getQuestion();
  }
}

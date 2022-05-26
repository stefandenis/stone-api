import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionsService {
  getQuestion(): string {
    return 'Hello World!';
  }
}

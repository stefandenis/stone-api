import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { AttemptsInterfaceRepository } from "./attempts.interface.repository";
import { Score } from "../quiz/domain/Score";
import { IndexResponse, SearchResponseBody } from "@elastic/elasticsearch/lib/api/types";
import { Attempt } from "./domain/Attempt";
import { QuizResult } from "../quiz/domain/QuizResult";
import { AttemptsMapper } from "./attempts.mapper";
import { AttemptNotFoundException } from "./exceptions/AttemptNotFoundException";

@Injectable()
export class AttemptsRepository implements AttemptsInterfaceRepository {
  index = "attempts";

  constructor(private elasticsearchService: ElasticsearchService) {}

  async getAttempt(id: string): Promise<Attempt> {
    const result: SearchResponseBody = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: {
          match: {
            _id: id,
          },
        },
      },
    });
    if (result.hits.hits.length === 0) {
      throw new AttemptNotFoundException(id);
    }
    return AttemptsMapper.mapSearchBodyResponsetoAttempt(result);
  }

  async insertAttempt(attempt: Attempt): Promise<QuizResult> {
    const result = await this.elasticsearchService.index({
      index: this.index,
      document: attempt,
      refresh: true,
    });
    return AttemptsMapper.mapIndexResponseToQuizResult(result);
  }
}

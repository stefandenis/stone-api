import { Injectable } from "@nestjs/common";
import { Stone } from "./domain/Stone";
import { StoneInterfaceRepository } from "./stone.interface.repository";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { SearchResponseBody } from "@elastic/elasticsearch/lib/api/types";
import { StoneMapper } from "./stone.mapper";
import { Page } from "../shared/Page";
import { randomUUID } from "crypto";

@Injectable()
export class StoneRepository implements StoneInterfaceRepository {
  index = "stones";
  constructor(private elasticsearchService: ElasticsearchService) {}

  async getStoneById(id: string): Promise<Stone> {
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
    return StoneMapper.mapSearchBodyResponseToStone(result);
  }

  async getStones(
    offset: number,
    pageSize: number,
    count: number,
  ): Promise<Page<Stone[]>> {
    const result: SearchResponseBody = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: {
          match_all: {},
        },
        from: offset,
        size: pageSize,
      },
    });
    return StoneMapper.mapSearchBodyResponseToStonesPage(
      result,
      offset,
      pageSize,
      count,
    );
  }

  async countStones(): Promise<number> {
    const count = await this.elasticsearchService.count({
      index: this.index,
    });
    return count.count;
  }

  async getRandomStones(size: number, seed: string): Promise<Stone[]> {
    const result: SearchResponseBody = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: {
          function_score: {
            query: {
              match_all: {},
            },
            functions: [
              {
                random_score: { seed: seed },
              },
            ],
          },
        },
        size: size,
      },
    });
    return StoneMapper.mapSearchBodyResponseToStones(result);
  }

  async getAnswers(stoneIdsInQuiz: string[], size: number): Promise<string[]> {
    const must_not_match = {
      must_not: stoneIdsInQuiz.map((stoneId) => {
        return {
          match: { _id: stoneId },
        };
      }),
    };

    const result: SearchResponseBody = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: {
          function_score: {
            query: {
              bool: must_not_match,
            },
            functions: [
              {
                random_score: { seed: randomUUID() },
              },
            ],
          },
        },
        size: size,
      },
    });
    return StoneMapper.mapSearchBodyResponseToAnswers(result);
  }
}

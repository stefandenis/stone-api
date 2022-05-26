import {
  SearchHit,
  SearchResponseBody,
} from "@elastic/elasticsearch/lib/api/types";
import { Stone } from "./domain/Stone";
import { Page } from "../shared/Page";

export interface StoneSource {
  image_path: string;
  stone_name: string;
}

export class StoneMapper {
  static mapSearchBodyResponseToStonesPage(
    result: SearchResponseBody,
    offset: number,
    pageSize: number,
    count: number,
  ): Page<Stone[]> {
    const stones: Stone[] = result.hits.hits.map(
      (hit: SearchHit<StoneSource>) => {
        return new Stone()
          .setId(hit._id)
          .setImagePath(hit._source.image_path)
          .setStoneName(hit._source.stone_name);
      },
    );
    return new Page<Stone[]>()
      .setItems(stones)
      .setPageSize(pageSize)
      .setCurrentPage(offset / pageSize + 1)
      .setTotalPages(Math.ceil(count / pageSize));
  }

  static mapSearchBodyResponseToStones(result: SearchResponseBody): Stone[] {
    return result.hits.hits.map((hit: SearchHit<StoneSource>) => {
      return new Stone()
        .setId(hit._id)
        .setImagePath(hit._source.image_path)
        .setStoneName(hit._source.stone_name);
    });
  }

  static mapSearchBodyResponseToStone(result: SearchResponseBody): Stone {
    const hit = result.hits.hits[0] as SearchHit<StoneSource>;
    return new Stone()
      .setId(hit._id)
      .setImagePath(hit._source.image_path)
      .setStoneName(hit._source.stone_name);
  }

  static mapSearchBodyResponseToAnswers(result: SearchResponseBody): string[] {
    return result.hits.hits.map((hit: SearchHit<StoneSource>) => {
      return hit._source.stone_name;
    });
  }
}

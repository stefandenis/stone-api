import { Inject, Injectable } from "@nestjs/common";
import { Stone } from "./domain/Stone";
import { STONE_REPOSITORY_TOKEN } from "./constants";
import { StoneInterfaceRepository } from "./stone.interface.repository";
import { Page } from "../shared/Page";

@Injectable()
export class StoneService {
  constructor(
    @Inject(STONE_REPOSITORY_TOKEN)
    private stoneRepository: StoneInterfaceRepository,
  ) {}
  async getStones(offset: number, pageSize: number): Promise<Page<Stone[]>> {
    const count = await this.stoneRepository.countStones();
    if (pageSize === undefined) {
      pageSize = 10000;
    }
    if (offset === undefined) {
      offset = 0;
    }
    return await this.stoneRepository.getStones(offset, pageSize, count);
  }

  async getStone(id: string): Promise<Stone> {
    return await this.stoneRepository.getStoneById(id);
  }
}

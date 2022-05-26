import { Body, Controller, Get, Param } from "@nestjs/common";
import { StoneService } from "./stone.service";
import { Stone } from "./domain/Stone";
import { StonesRequest } from "./dto/StonesRequest";
import { Page } from "../shared/Page";

@Controller()
export class StoneController {
  constructor(private stoneService: StoneService) {}

  @Get("/stones")
  async getStones(@Body() body: StonesRequest): Promise<Page<Stone[]>> {
    return await this.stoneService.getStones(body.offset, body.pageSize);
  }

  @Get("/stone/:id")
  async getStone(@Param("id") id): Promise<Stone> {
    return await this.stoneService.getStone(id);
  }
}

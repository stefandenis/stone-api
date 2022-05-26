import { NotFoundException } from "@nestjs/common";

export class AttemptNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Attempt with id: ${id} was not found`);
  }
}

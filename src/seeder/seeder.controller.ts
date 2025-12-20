import { Controller, Delete, HttpCode, Post, UseGuards } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederGuard } from './seeder.guard';

@Controller('/api/seeder')
@UseGuards(SeederGuard)
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('/run')
  @HttpCode(200)
  async seed() {
    return this.seederService.seed();
  }

  @Delete('/clear')
  @HttpCode(200)
  async clear() {
    return this.seederService.clear();
  }
}

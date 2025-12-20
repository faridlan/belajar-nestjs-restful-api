/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Delete, HttpCode, Post, UseGuards } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederGuard } from './seeder.guard';
import { Auth } from 'src/common/auth.decorator';
import { User } from '@prisma/client';
import { CreateSeederSwagger } from 'src/common/swagger/seeder/create.swagger';
import { ClearSeederSwagger } from 'src/common/swagger/seeder/clear.swagger';

@Controller('/api/seeder')
@UseGuards(SeederGuard)
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('/run')
  @CreateSeederSwagger()
  @HttpCode(200)
  async seed(@Auth() user: User) {
    return this.seederService.seed();
  }

  @Delete('/clear')
  @ClearSeederSwagger()
  @HttpCode(200)
  async clear(@Auth() user: User) {
    return this.seederService.clear();
  }
}

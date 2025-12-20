import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { SeederGuard } from './seeder.guard';

@Module({
  controllers: [SeederController],
  providers: [SeederService, SeederGuard],
})
export class SeederModule {}

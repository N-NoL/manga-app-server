import { Module } from '@nestjs/common';
import { Status } from './status.entity';
import { StatusService } from './status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusController } from './status.controller';

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports: [
    TypeOrmModule.forFeature([Status])
  ]
})
export class StatusModule {}

import { Module } from '@nestjs/common';
import { Format } from './format.entity';
import { FormatService } from './format.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatController } from './format.controller';

@Module({
  controllers: [FormatController],
  providers: [FormatService],
  imports: [
    TypeOrmModule.forFeature([Format])
  ]
})
export class FormatModule {}

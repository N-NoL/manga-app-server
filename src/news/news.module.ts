import { Module } from '@nestjs/common';
import { News } from './news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from './news.controller';

@Module({
  controllers: [NewsController],
  imports: [
    TypeOrmModule.forFeature([News])
  ]
})
export class NewsModule {}

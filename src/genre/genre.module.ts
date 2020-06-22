import { Module } from '@nestjs/common';
import { Genre } from './genre.entity';
import { GenreService } from './genre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreController } from './genre.controller';

@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports: [
    TypeOrmModule.forFeature([Genre])
  ]
})
export class GenreModule {}

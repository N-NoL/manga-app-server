import { Module } from '@nestjs/common';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { Chapter } from './chapter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manga } from 'src/manga/manga.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { Bookmark } from 'src/manga/bookmark/bookmark.entity';

@Module({
  controllers: [ChapterController],
  providers: [ChapterService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Chapter,Manga,Bookmark])
  ]
})
export class ChapterModule {}

import { Chapter } from './../chapter/chapter.entity';
import { Type } from './../type/type.entity';
import { Genre } from './../genre/genre.entity';
import { Module } from '@nestjs/common';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manga } from './manga.entity';
import { Status } from './../status/status.entity';
import { Format } from 'src/format/format.entity';
import { User } from 'src/user/user.entity';
import { RatingController } from './rating/rating.controller';
import { RatingService } from './rating/rating.service';
import { Rating } from './rating/rating.entity';
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkService } from './bookmark/bookmark.service';
import { Bookmark } from './bookmark/bookmark.entity';


@Module({
  controllers: [RatingController, BookmarkController, MangaController],
  providers: [RatingService, BookmarkService, MangaService],
  imports: [
  TypeOrmModule.forFeature([Manga, Bookmark, Genre, Status, Type, Format, Chapter, User, Rating]),
  ] 
})
export class MangaModule {}

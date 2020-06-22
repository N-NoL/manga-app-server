import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { UserAdminController, UserAdminService } from "./user-admin.controller";
import { Manga } from "src/manga/manga.entity";
import { MangaAdminService, MangaAdminController } from "./manga-admin.controller";
import { Genre } from "src/genre/genre.entity";
import { GenreAdminService, GenreAdminController } from "./genre-admin.controller";
import { FormatAdminService, FormatAdminController } from "./format-admin.controller";
import { Format } from "src/format/format.entity";
import { Status } from "src/status/status.entity";
import { Type } from "src/type/type.entity";
import { TypeAdminService, TypeAdminController } from "./type-admin.controller";
import { StatusAdminService, StatusAdminController } from "./status-admin.controller";
import { Chapter } from "src/chapter/chapter.entity";
import { CommentAdminService, CommentAdminController } from "./comment-admin.controller";
import { ChapterAdminService, ChapterAdminController } from "./chapter-admin.controller";
import { Comment } from 'src/comment/comment.entity';
import { News } from "src/news/news.entity";
import { NewsAdminService, NewsAdminController } from "./news-admin.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User,Manga,Genre,Format,Type,Status,Chapter,Comment,News])],
  providers: [UserAdminService,MangaAdminService,GenreAdminService,NewsAdminService,
    FormatAdminService,TypeAdminService,StatusAdminService,ChapterAdminService,CommentAdminService],
//   exports: [UserService],
  controllers: [UserAdminController,MangaAdminController,GenreAdminController,FormatAdminController,
    TypeAdminController,StatusAdminController,ChapterAdminController,CommentAdminController,NewsAdminController],
})
export class AdminModule {}
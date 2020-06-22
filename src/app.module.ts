import { AdminModule } from './admin/admin.module';
import { User } from "./user/user.entity";
import { Manga } from "./manga/manga.entity";
// import { User } from "../entity/User";
// import { ProfilePreferences } from "../entity/ProfilePreferences";
// import { Category } from "../entity/Category";
import { Rating } from 'src/manga/rating/rating.entity';
import { Type } from 'src/type/type.entity';
import { Status } from 'src/status/status.entity';
import { Bookmark } from 'src/manga/bookmark/bookmark.entity';
import { Genre } from 'src/genre/genre.entity';
import { Friend } from './friend/friend.entity';
import { Format } from 'src/format/format.entity';
import { Comment } from "./comment/comment.entity";
import { Chapter } from 'src/chapter/chapter.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaModule } from './manga/manga.module';
import { ChapterModule } from './chapter/chapter.module';
import { GenreModule } from './genre/genre.module';
import { StatusModule } from './status/status.module';
import { TypeModule } from './type/type.module';
import { FormatModule } from './format/format.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { FriendModule } from './friend/friend.module';
import { UploadModule } from './upload/upload.module';
import { ChatModule } from './chat/chat.module';
import filterConfig from './mangaFilter'  
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
// import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin'
import { createConnection } from "typeorm";
import { NewsModule } from "./news/news.module";
@Module({
  imports: [
        AdminModule,  
    TypeOrmModule.forRoot(),NewsModule,ChatModule,UploadModule, FriendModule, CommentModule, MangaModule, ChapterModule, GenreModule, StatusModule, TypeModule, FormatModule, UserModule, AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'admin'),
      serveRoot: '/admin'
    }),
  ],
  providers:[]
})

export class AppModule {
  // constructor(private readonly adminSite: DefaultAdminSite) {
  //   adminSite.register('User', User)
  //   adminSite.register('Manga', Manga)
  // }
}


const filterCreator = async (Ent,EntName) => {
  if(!await Ent.count()){
    console.log('создание фильтра',EntName)
    for (let i = 0; i < filterConfig[EntName].length; i++) {
      const t = filterConfig[EntName][i];
      console.log(t)
      await Ent.save(t)
    }
  }
}

const start = async () => {
  const connection = await createConnection()

  // console.log(connection.getMetadata('manga_format_genre'))
  // await filterCreator(Type,'type')
  // await filterCreator(Status,'status')
  // await filterCreator(Genre,'genre')
  // await filterCreator(Format,'format')
}
start()
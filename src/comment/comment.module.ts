import { Module } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { Manga } from 'src/manga/manga.entity';
import { User } from 'src/user/user.entity';
import { UserToComment } from 'src/comment/commentToUser.entity';
@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
  TypeOrmModule.forFeature([Comment,User,UserToComment,Manga])
  ]
})
export class CommentModule {}

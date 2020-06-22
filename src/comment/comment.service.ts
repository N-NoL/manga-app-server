import { Comment } from './comment.entity';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCommentDto, CreateCommentDto } from './comment.dto';
import { Manga } from 'src/manga/manga.entity';
import { User } from './../user/user.entity';
import { UserToComment } from './commentToUser.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Manga)
    private mangaRepository: Repository<Manga>,
    @InjectRepository(UserToComment)
    private userToCommentRepository: Repository<UserToComment>,
  ){}
  async find(mangaId,userId): Promise<object> {
    const comments = await this.commentRepository.createQueryBuilder('comment')
    .leftJoin('comment.user','user')
    .leftJoin('comment.usersRated', 'user_to_comment', 'user_to_comment.userId = :userId',{userId})
    .select(['user_to_comment.value','comment.id','comment.banStatus','comment.rootPath','comment.comment','comment.value','user.id','user.username','user.imgUrl','comment.createdAt'])
    .where({mangaId})
    .orderBy('comment.id')
    .getMany(); 

    return comments;
  }

  async create(comment): Promise<object> {
    console.log(comment)
    let res = {}
    const user = await this.userRepository.findOne({id:comment.userId})
    if(comment.rootId){
      const rootComment = await this.commentRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user','user')
      .where({id:comment.rootId})
      .getOne()
      res = await this.commentRepository.save({...comment,rootPath:[...rootComment.rootPath,rootComment.id]});
    } else {
      res = await this.commentRepository.save({...comment,rootPath:[]});
    }
    return {user,...res,usersRated:[]}
  }
  async vote(vote){
    const crnt = await this.userToCommentRepository.findOne({commentId:vote.commentId,userId:vote.userId})
    let res 
    if(crnt){
        crnt.value=vote.value
        res= await this.userToCommentRepository.save(crnt);
    } else {
      res= await this.userToCommentRepository.save(vote);
    }
  
    const commentUpd = await this.commentRepository.createQueryBuilder('comment')
    .update()
    .set(
      await this.userToCommentRepository.createQueryBuilder("user_to_comment")
      .where({commentId:vote.commentId})
      .select("SUM(user_to_comment.value)", "value")
      .getRawOne()
    )
    .where("id = :id", { id: vote.commentId })
    .execute();

    return res
  }
}

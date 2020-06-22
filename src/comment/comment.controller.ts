import { Controller, Get, Put, Delete, Param, Body, Post, UseGuards, Request } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { NonBlockingAuthGuard } from 'src/guards/nonBlocking.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService){}
  @UseGuards(NonBlockingAuthGuard)
  @Get(':id')
  getComments(@Param('id') id, @Request() req) :Promise<object>{
    const userId = req.user.userId
    return this.commentService.find(id, userId)
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateCommentDto, @Request() req) :Promise<object>{
    dto.userId = req.user.userId
    return this.commentService.create(dto)
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/vote')
  vote(@Body() vote, @Request() req) :Promise<object>{
    vote.userId = req.user.userId
    return this.commentService.vote(vote)
  }
}

import { Controller, Get, Put, Delete, Param, Body, Post } from '@nestjs/common';
import { News } from './news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Controller('news')
export class NewsController {
  constructor(
    @InjectRepository(News)
    private formatRepository: Repository<News>,
  ){}
  @Get()
  getLast(){
    return this.formatRepository.createQueryBuilder("news").orderBy('news.createdAt', 'DESC').getOne();
  }
}

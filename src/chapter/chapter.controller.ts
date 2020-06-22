import { Chapter } from './chapter.entity';
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateCharperDto, UpdateCharperDto } from './chapter.dto';
import { AuthGuard } from '@nestjs/passport';
import { NonBlockingAuthGuard } from 'src/guards/nonBlocking.guard';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService){}
  @Get()
  getAll() :any{
    return this.chapterService.findAll()
  }
  @Get(':id')
  @UseGuards(NonBlockingAuthGuard)
  getChapterByID(@Param('id') id, @Request() req) :Promise<Chapter | object>{
    const userId = req.user.userId
    if(userId){
      return this.chapterService.readChapter({chapterId:id,userId})
    }
    return this.chapterService.findChapter(id)
  }
  @Post()
  create(@Body() dto: CreateCharperDto) :Promise<Chapter>{
    return this.chapterService.create(dto)
  }
  @Put()
  update(@Body() dto: UpdateCharperDto) :Promise<object>{
    return this.chapterService.update(dto)
  }
  @Delete(':id')
  delete(@Param('id') id) :Promise<object>{
    return this.chapterService.delete(id)
  }

}

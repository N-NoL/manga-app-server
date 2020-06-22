import { MangaService } from './manga.service';
import { Controller, Get, Param, Query, Post, Body, Delete, Put, UseGuards, Request, Header, CanActivate } from '@nestjs/common';
import { Manga } from './manga.entity';
import { CreateMangaDto, UpdateMangaDto, QueryMangaDto } from './manga.dto';
import { AuthGuard } from '@nestjs/passport';
import { NonBlockingAuthGuard } from 'src/guards/nonBlocking.guard';


@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService){}
  @Get('search')
  searchManga(@Query() query) :Promise<{list:Manga[], total:number}>{
    console.log(query)
    return this.mangaService.searchManga(query)
  }

  @Get()
  getList(@Query() query: QueryMangaDto) :Promise<{list:Manga[], total:number}>{
    return this.mangaService.findList(query)
  }

  @Get('/updates')
  getUpdates(@Query() query: QueryMangaDto) :Promise<{list:object[], total:number}>{
    return this.mangaService.findUpdates(query)
  }


  @Get(':id')
  @UseGuards(NonBlockingAuthGuard)
  getOne(@Param() param, @Request() req) :Promise<Manga | object>{
    const userId = req.user.userId
    if(userId){
      return this.mangaService.findOneWithUserData({userId,mangaId:param.id})
    }
    return this.mangaService.findOne(param.id)
  }


  @Post()
  create(@Body() dto: CreateMangaDto) :Promise<Manga>{
    return this.mangaService.create(dto)
  }
  
  @Put()
  update(@Body() dto: UpdateMangaDto) :Promise<object>{
    return this.mangaService.update(dto)
  }

  @Delete(':id')
  delete(@Param() id) :Promise<object>{
    return this.mangaService.delete(id)
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post('subscribe')
  subscribe(@Body() manga: { mangaId:number }, @Request() req) {
    const userId = req.user.userId
    return this.mangaService.subscribe({userId,...manga})
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('unsubscribe')
  unsubscribe(@Body() manga: { mangaId:number }, @Request() req) {
    const userId = req.user.userId
    return this.mangaService.unsubscribe({userId,...manga})
  }
}

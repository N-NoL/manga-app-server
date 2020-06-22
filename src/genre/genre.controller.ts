import { Controller, Get, Put, Delete, Param, Body, Post } from '@nestjs/common';
import { Genre } from './genre.entity';
import { GenreService } from './genre.service';
import { CreateGenreDto, UpdateGenreDto } from './genre.dto';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService){}
  @Get()
  getAll() :any{
    return this.genreService.findAll()
  }
  @Get(':id')
  getOneByID(@Param('id') id) :Promise<Genre>{
    return this.genreService.findOne(id)
  }
  @Post()
  create(@Body() dto: CreateGenreDto) :Promise<Genre>{
    return this.genreService.create(dto)
  }
  @Put()
  update(@Body() dto: UpdateGenreDto) :Promise<object>{
    return this.genreService.update(dto)
  }
  @Delete(':id')
  delete(@Param() id) :Promise<object>{
    return this.genreService.delete(id)
  }
}

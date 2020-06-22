import { Controller, Get, Put, Delete, Param, Body, Post } from '@nestjs/common';
import { Format } from './format.entity';
import { FormatService } from './format.service';
import { CreateFormatDto, UpdateFormatDto } from './format.dto';

@Controller('format')
export class FormatController {
  constructor(private readonly formatService: FormatService){}
  @Get()
  getAll() :Promise<Format[]>{
    return this.formatService.findAll()
  }
  @Get(':id')
  getOneByID(@Param('id') id) :Promise<Format>{
    return this.formatService.findOne(id)
  }
  @Post()
  create(@Body() dto: CreateFormatDto) :Promise<Format>{
    return this.formatService.create(dto)
  }
  @Put()
  update(@Body() dto: UpdateFormatDto) :Promise<object>{
    return this.formatService.update(dto)
  }
  @Delete(':id')
  delete(@Param() id) :Promise<object>{
    return this.formatService.delete(id)
  }
}

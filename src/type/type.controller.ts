import { Controller, Get, Put, Delete, Param, Body, Post } from '@nestjs/common';
import { Type } from './type.entity';
import { TypeService } from './type.service';
import { CreateTypeDto, UpdateTypeDto } from './type.dto';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService){}
  @Get()
  getAll() :Promise<Type[]>{
    return this.typeService.findAll()
  }
  @Get(':id')
  getOneByID(@Param('id') id) :Promise<Type>{
    return this.typeService.findOne(id)
  }
  @Post()
  create(@Body() dto: CreateTypeDto) :Promise<Type>{
    return this.typeService.create(dto)
  }
  @Put()
  update(@Body() dto: UpdateTypeDto) :Promise<object>{
    return this.typeService.update(dto)
  }
  @Delete(':id')
  delete(@Param() id) :Promise<object>{
    return this.typeService.delete(id)
  }
}

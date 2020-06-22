import { Controller, Get, Put, Delete, Param, Body, Post } from '@nestjs/common';
import { Status } from './status.entity';
import { StatusService } from './status.service';
import { CreateStatusDto, UpdateStatusDto } from './status.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService){}
  @Get()
  getAll() :Promise<Status[]>{
    return this.statusService.findAll()
  }
  @Get(':id')
  getOneByID(@Param('id') id) :Promise<Status>{
    return this.statusService.findOne(id)
  }
  @Post()
  create(@Body() dto: CreateStatusDto) :Promise<Status>{
    return this.statusService.create(dto)
  }
  @Put()
  update(@Body() dto: UpdateStatusDto) :Promise<object>{
    return this.statusService.update(dto)
  }
  @Delete(':id')
  delete(@Param() id) :Promise<object>{
    return this.statusService.delete(id)
  }
}

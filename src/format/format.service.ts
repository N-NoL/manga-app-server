import { Format } from './format.entity';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateFormatDto, CreateFormatDto } from './format.dto';

@Injectable()
export class FormatService {
  constructor(
    @InjectRepository(Format)
    private formatRepository: Repository<Format>,
  ){}
  findAll(): Promise<Format[]> {
    return this.formatRepository.find();
  }
  findOne(id: string): Promise<Format> {
    return this.formatRepository.findOne(id);
  }
  create(dto: CreateFormatDto): Promise<Format> {
    return this.formatRepository.save(dto);
  }
  async update(dto: UpdateFormatDto): Promise<Format> {
    const genre = await this.formatRepository.findOne(dto.id)
    if(genre){
      return await this.formatRepository.save(dto);
    }
    throw new HttpException('format not found', HttpStatus.NOT_FOUND);
  }
  delete(id: string): Promise<object> {
    return this.formatRepository.delete(id);
  }
}

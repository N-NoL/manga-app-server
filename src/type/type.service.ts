import { Type } from './type.entity';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTypeDto, CreateTypeDto } from './type.dto';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
  ){}
  findAll(): Promise<Type[]> {
    return this.typeRepository.find();
  }
  findOne(id: string): Promise<Type> {
    return this.typeRepository.findOne(id);
  }
  create(dto: CreateTypeDto): Promise<Type> {
    return this.typeRepository.save(dto);
  }
  async update(dto: UpdateTypeDto): Promise<Type> {
    const genre = await this.typeRepository.findOne(dto.id)
    if(genre){
      return await this.typeRepository.save(dto);
    }
    throw new HttpException('type not found', HttpStatus.NOT_FOUND);
  }
  delete(id: string): Promise<object> {
    return this.typeRepository.delete(id);
  }
}

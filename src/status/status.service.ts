import { Status } from './status.entity';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStatusDto, CreateStatusDto } from './status.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ){}
  findAll(): Promise<Status[]> {
    return this.statusRepository.find();
  }
  findOne(id: string): Promise<Status> {
    return this.statusRepository.findOne(id);
  }
  create(dto: CreateStatusDto): Promise<Status> {
    return this.statusRepository.save(dto);
  }
  async update(dto: UpdateStatusDto): Promise<Status> {
    const genre = await this.statusRepository.findOne(dto.id)
    if(genre){
      return await this.statusRepository.save(dto);
    }
    throw new HttpException('status not found', HttpStatus.NOT_FOUND);
  }
  delete(id: string): Promise<object> {
    return this.statusRepository.delete(id);
  }
}

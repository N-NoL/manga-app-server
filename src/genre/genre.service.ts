import { Genre } from './genre.entity';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateGenreDto, CreateGenreDto } from './genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ){}
  findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }
  findOne(id: string): Promise<Genre> {
    return this.genreRepository.findOne(id);
  }
  create(dto: CreateGenreDto): Promise<Genre> {
    return this.genreRepository.save(dto);
  }
  async update(dto: UpdateGenreDto): Promise<Genre> {
    const genre = await this.genreRepository.findOne(dto.id)
    if(genre){
      return await this.genreRepository.save(dto);
    }
    throw new HttpException('genre not found', HttpStatus.NOT_FOUND);
  }
  delete(id: string): Promise<object> {
    return this.genreRepository.delete(id);
  }
}

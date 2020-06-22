import { Chat } from './chat.entity';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateChatDto, CreateChatDto } from './chat.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}
  async findAll(userId): Promise<Chat[]> {
    const list = await this.chatRepository
    .createQueryBuilder('chat')
    .leftJoinAndSelect('chat.users','user')
    .where('user.id = :userId',{userId})
    .getMany()
    if(list.length===0){
      return []
    }
    return this.chatRepository
    .createQueryBuilder('chat')
    .whereInIds(list.map(el=>el.id))
    .leftJoinAndSelect('chat.users','user','user.id != :userId',{userId})
    .getMany()
  }

  async create(dto: CreateChatDto): Promise<Chat> {
    if(dto.users.length!==2){
      throw new HttpException('2 u in d', HttpStatus.BAD_REQUEST);
    }

    const f1 =  (await this.chatRepository
    .createQueryBuilder('chat')
    .leftJoinAndSelect('chat.users','user','user.id IN (:...ids)',{ids:dto.users})
    .getMany()).map(ch=>ch.users.length).find(n=>n===2)
    console.log(f1)
    if(f1){
      return await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.users','user')
      .getOne()
    }
    
    return await this.chatRepository.save({users:(
      await this.userRepository.findByIds(dto.users)
    )});
  }
  async findOne(id: string): Promise<Chat> {
    return await this.chatRepository
    .createQueryBuilder('chat')
    .where('chat.id = :id',{id})
    .leftJoinAndSelect('chat.users','user')
    .leftJoinAndSelect('chat.messages','message')
    .getOne()
  }
  // create(dto: CreateChatDto): Promise<Chat> {
  //   return this.chatRepository.save(dto);
  // }
  // async update(dto: UpdateChatDto): Promise<Chat> {
  //   const genre = await this.chatRepository.findOne(dto.id)
  //   if(genre){
  //     return await this.chatRepository.save(dto);
  //   }
  //   throw new HttpException('chat not found', HttpStatus.NOT_FOUND);
  // }
  // delete(id: string): Promise<object> {
  //   return this.chatRepository.delete(id);
  // }
}

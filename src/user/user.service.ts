
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto'
import { Manga } from 'src/manga/manga.entity';
import { Friend } from './../friend/friend.entity';


@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Manga)
    private mangaRepository: Repository<Manga>,
  ){}

  async searchUser({sub}): Promise<{ list: User[], total: number }> {
    console.log(sub)
    const [list, total] = await this.userRepository
    .createQueryBuilder("user")
    .where("user.username LIKE :sub",{sub:`%${sub}%`})
    .take(60)
    .getManyAndCount();
    return {list, total}
  }

  async findOne(username: string): Promise<User> {
    const a = await this.userRepository.createQueryBuilder('user')
    .where('username = :username', {username})
    .getOne();
    console.log("username+", username,a)
    return a
  }
  async findById({id,userId}): Promise<User> {
    const user = await this.userRepository.createQueryBuilder("user")
    .where('user.id = :id',{id})
    .leftJoinAndSelect('user.followers', 'friend', 'friend.senderId = :userId',{userId})
    .getOne();
    // const user = await this.userRepository.findOne(id);
    return user;
  }
  async findSubscriptions(id: number): Promise<Manga[]> {
    return await this.mangaRepository
    .createQueryBuilder("manga")
    .where({banStatus:0})
    .leftJoin("manga.subscribers", "user")
    .andWhere('user.id = :id',{id})
    .leftJoinAndSelect('manga.lastChapter', 'chapter')
    .getMany()
  }
  async changePassword({id,dto}) {
    const user = await this.userRepository.createQueryBuilder('user')
    .where({id})
    .addSelect("user.password")
    .getOne()
    if(user.password===dto.old){
      if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(dto.password)){
        return await this.mangaRepository
        .createQueryBuilder()
        .update(User)
        .set({
          password:dto.password
        })
        .where("id = :id", { id })
        .execute();
      }
      throw new HttpException('некоректный пароль', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('пароли не совпадают', HttpStatus.BAD_REQUEST);
  }
  async changeProfileSettings({id,dto}) {
    const {friendliness,showProfile,showStatus} = dto
    return await this.mangaRepository
    .createQueryBuilder()
    .update(User)
    .set({
      isOnline:showStatus,
      friendliness,
      showProfile,
      showStatus
    })
    .where("id = :id", { id })
    .execute();
  }
  async changeProfile({id,dto}) {
    const {username,email,lastName,firstName,gender,location} = dto
    console.log({username,email})
    if(!(/^(?=.*[A-Za-z])[A-Za-z\d]{4,}$/.test(username)&&
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    )){
      throw new HttpException('некоректные данные', HttpStatus.BAD_REQUEST);
    }
    const usernames = await this.userRepository.createQueryBuilder('user')
    .where('user.username =:username',{username})
    .getOne()
    const emails = await this.userRepository.createQueryBuilder('user')
    .where('user.email =:email',{email})
    .getOne()
    if(usernames&&usernames.id!=id){
      throw new HttpException('пользователь с таким ником уже существует', HttpStatus.BAD_REQUEST);
    }
    if(emails&&usernames.id!=id){
      throw new HttpException('эта электронная почта уже используется', HttpStatus.BAD_REQUEST);
    }
    const a = await this.mangaRepository
    .createQueryBuilder()
    .update(User)
    .set({
      username,
      email,
      lastName,
      firstName,
      gender,
      location
    })
    .where("id = :id", { id })
    .execute();
    return a;
  }
}
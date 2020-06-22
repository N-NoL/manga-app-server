import { Friend } from './friend.entity';
//friend
//Friend
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFriendDto } from './friend.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}
  async userFriends(id): Promise<{list:Friend[],count:number}> {
    const [list, count] = await this.friendRepository
    .createQueryBuilder("friend")
    .where("friend.senderId = :id", {id})
    .andWhere("friend.status = 2")
    .leftJoinAndSelect("friend.reseiver", "user")
    .getManyAndCount();
    return {list,count};
  }
  // findOne(id: string): Promise<Friend> {
  //   return this.friendRepository.findOne(id);
  // }
  async create(dto: CreateFriendDto) {
    console.log(dto)
    if(dto.reseiverId==dto.senderId){
      throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
    }
    // const friend = await this.friendRepository
    const [friends, cnt] = await this.friendRepository
    .createQueryBuilder("friend")
    // .select("SUM(user.photosCount)", "sum")
    .where("friend.senderId = :senderId AND friend.reseiverId = :reseiverId", dto)
    .orWhere("friend.senderId = :reseiverId AND friend.reseiverId = :senderId", dto)
    .getManyAndCount();
    if(cnt===2){
      throw new HttpException('Accepted', HttpStatus.ACCEPTED);
    }
    if(cnt===1 && friends[0].senderId==dto.senderId){
      throw new HttpException('Accepted', HttpStatus.ACCEPTED);
    }
    const friendReq = await this.friendRepository.save(dto)
    console.log(friends, cnt)
    friendReq.status = cnt+1
    const F = await this.userRepository.findOne({id:dto.reseiverId})
    if(F&&F.friendliness&&cnt===0){
      friendReq.status = 2
      await this.friendRepository.save({
        reseiverId:dto.senderId,
        senderId:dto.reseiverId
      })
    }
    await this.friendRepository
    .createQueryBuilder()
    .update(Friend)
    .set({ status: friendReq.status })
    .where("senderId = :senderId AND reseiverId = :reseiverId", dto)
    .orWhere("senderId = :reseiverId AND reseiverId = :senderId", dto)
    .execute();
    
    // const friendReq = await this.friendRepository.save(dto)
    return friendReq;
  }
  // async update(dto: UpdateFriendDto): Promise<Friend> {
  //   const genre = await this.friendRepository.findOne(dto.id)
  //   if(genre){
  //     return await this.friendRepository.save(dto);
  //   }
  //   throw new HttpException('friend not found', HttpStatus.NOT_FOUND);
  // }
  async delete(dto: CreateFriendDto): Promise<object> {
    const friendDel = await this.friendRepository.delete(dto);
    const status = await this.friendRepository
    .createQueryBuilder("friend")
    // .select("SUM(user.photosCount)", "sum")
    .where("friend.senderId = :senderId AND friend.reseiverId = :reseiverId", dto)
    .orWhere("friend.senderId = :reseiverId AND friend.reseiverId = :senderId", dto)
    .getCount();
    console.log(status)
    await this.friendRepository
    .createQueryBuilder()
    .update(Friend)
    .set({ status: status })
    .where("senderId = :senderId AND reseiverId = :reseiverId", dto)
    .orWhere("senderId = :reseiverId AND reseiverId = :senderId", dto)
    .execute();

    return friendDel;
  }
}

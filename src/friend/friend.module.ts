import { Module } from '@nestjs/common';
import { Friend } from './friend.entity';
import { FriendService } from './friend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendController } from './friend.controller';
import { User } from 'src/user/user.entity';
//friend
//Friend
@Module({
  controllers: [FriendController],
  providers: [FriendService],
  imports: [
    TypeOrmModule.forFeature([Friend,User])
  ]
})
export class FriendModule {}

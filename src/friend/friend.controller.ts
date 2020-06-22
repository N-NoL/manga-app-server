import { Controller, Get, Put, Delete, Param, Body, Post, UseGuards,Request } from '@nestjs/common';
import { Friend } from './friend.entity';
import { FriendService } from './friend.service';
import { CreateFriendDto } from './friend.dto';
import { AuthGuard } from '@nestjs/passport';
//friend
//Friend
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService){}

  @Get(':id')
  getListByUserID(@Param('id') id) :Promise<{list:Friend[],count:number}> {
    return this.friendService.userFriends(id)
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateFriendDto, @Request() req) {
    dto.senderId = req.user.userId
    return this.friendService.create(dto)
  }
  // @Put()
  // update(@Body() dto: UpdateFriendDto) :Promise<object>{
  //   return this.friendService.update(dto)
  // }
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  delete(@Body() dto: CreateFriendDto, @Request() req) {
    dto.senderId = req.user.userId
    console.log(dto)
    return this.friendService.delete(dto)
  }
  // @Delete(':id')
  // delete(@Param() id) :Promise<object>{
  //   return this.friendService.delete(id)
  // }
}
  
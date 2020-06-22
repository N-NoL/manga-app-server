import { Controller, Get, Put, Delete, Param, Body,Request, Post, Query, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.entity';
import { NonBlockingAuthGuard } from 'src/guards/nonBlocking.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}
  @Get('search')
  searchUser(@Query() query) :Promise<{list:User[], total:number}>{
    console.log(query)
    return this.userService.searchUser(query)
  }

  @Get(':id')
  @UseGuards(NonBlockingAuthGuard)
  getOne(@Param("id") id, @Request() req) :Promise<User>{
    const userId = req.user.userId
    return this.userService.findById({id,userId})
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile')
  changeProfile(@Request() req,@Body() dto) {
    const id = req.user.userId
    console.log(id)
    return this.userService.changeProfile({id,dto})
  }
  @Put('settings')
  @UseGuards(AuthGuard('jwt'))
  changeProfileSettings(@Request() req,@Body() dto) {

    const id = req.user.userId
    return this.userService.changeProfileSettings({id,dto})
  }
  @UseGuards(AuthGuard('jwt'))  
  @Put('password')
  changePassword(@Request() req,@Body() dto) {
    const id = req.user.userId
    return this.userService.changePassword({id,dto})
  }
  // @Post('/registration')
  // registration(@Body() user:CreateUserDto) :Promise<User>{
  //   return this.userService.registration(user)
  // }
  @Get('subscriptions/:id')
  getSubscriptions(@Param("id") id) {
    return this.userService.findSubscriptions(id)
  }
}

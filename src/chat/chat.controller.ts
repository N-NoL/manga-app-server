import { Controller, Get, Put,Request, Delete, Param, Body, Post, UseGuards } from '@nestjs/common';
import { Chat } from './chat.entity'
import { ChatService } from './chat.service'
import { CreateChatDto, UpdateChatDto } from './chat.dto'
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService){}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Request() req):Promise<Chat[]> {
    const userId = req.user.userId
    return this.chatService.findAll(userId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getOneByID(@Param('id') id) :Promise<Chat>{
    return this.chatService.findOne(id)
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateChatDto, @Request() req) :Promise<Chat>{
    const userId = req.user.userId
    
    dto.users=dto.users.filter(el=>el!=userId)
    if(!dto.users.length){
      return
    }
    dto.users.push(userId)
    return this.chatService.create(dto)
  }

  // @Post()
  // create(@Body() dto: CreateChatDto) :Promise<Chat>{
  //   return this.chatService.create(dto)
  // }
  // @Put()
  // update(@Body() dto: UpdateChatDto) :Promise<object>{
  //   return this.chatService.update(dto)
  // }
  // @Delete(':id')
  // delete(@Param() id) :Promise<object>{
  //   return this.chatService.delete(id)
  // }
}

import { Module } from '@nestjs/common';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [
  TypeOrmModule.forFeature([Chat,User]),
  ]
})
export class ChatModule {}

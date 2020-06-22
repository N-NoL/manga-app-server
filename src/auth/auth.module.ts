import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { ChatGateway } from 'src/chat/chat.gateway';
import { Message } from 'src/chat/message.entity';
import { Chat } from 'src/chat/chat.entity';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User,Chat,Message]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy,ChatGateway],
  exports: [AuthService],
})
export class AuthModule {}
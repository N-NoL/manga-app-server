import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { Manga } from 'src/manga/manga.entity';

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
  imports: [
  TypeOrmModule.forFeature([User,Manga])
  ]
})
export class UserModule {}
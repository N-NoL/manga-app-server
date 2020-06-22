import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload.controller';
import { User } from 'src/user/user.entity';

@Module({
  controllers: [UploadController],
  imports: [
    TypeOrmModule.forFeature([User])
  ]
})
export class UploadModule {} 

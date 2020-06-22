import { Module } from '@nestjs/common';
import { Type } from './type.entity';
import { TypeService } from './type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeController } from './type.controller';

@Module({
  controllers: [TypeController],
  providers: [TypeService],
  imports: [
    TypeOrmModule.forFeature([Type])
  ]
})
export class TypeModule {}

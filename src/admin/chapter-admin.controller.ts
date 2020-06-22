import { Controller, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Crud, CrudController } from "@nestjsx/crud";
import { Chapter } from 'src/chapter/chapter.entity';
import { AdminAuthGuard } from 'src/guards/admin.guard';



@Injectable()
export class ChapterAdminService extends TypeOrmCrudService<Chapter> {
  constructor(@InjectRepository(Chapter) repo) {
    super(repo);
  }
}

@Crud({
  model: {
    type: Chapter,
  },
})
@UseGuards(AdminAuthGuard)
@Controller("admin/chapter")
export class ChapterAdminController implements CrudController<Chapter> {
  constructor(public service: ChapterAdminService) {}
}


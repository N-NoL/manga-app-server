import { Controller, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from '../news/news.entity';
import { Crud, CrudController } from "@nestjsx/crud";
import { AdminAuthGuard } from 'src/guards/admin.guard';



@Injectable()
export class NewsAdminService extends TypeOrmCrudService<News> {
  constructor(@InjectRepository(News) repo) {
    super(repo);
  }
}

@Crud({
  model: {
    type: News,
  },
})
@UseGuards(AdminAuthGuard)
@Controller("admin/news")
export class NewsAdminController implements CrudController<News> {
  constructor(public service: NewsAdminService) {}
}


import { Controller, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Crud, CrudController } from "@nestjsx/crud";
import { Manga } from 'src/manga/manga.entity';
import { AdminAuthGuard } from 'src/guards/admin.guard';



@Injectable()
export class MangaAdminService extends TypeOrmCrudService<Manga> {
  constructor(@InjectRepository(Manga) repo) {
    super(repo);
  }
}

@Crud({
  model: {
    type: Manga,
  },
})
@UseGuards(AdminAuthGuard)
@Controller("admin/manga")
export class MangaAdminController implements CrudController<Manga> {
  constructor(public service: MangaAdminService) {}
}


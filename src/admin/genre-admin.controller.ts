import { Controller, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Crud, CrudController } from "@nestjsx/crud";
import { Genre } from 'src/genre/genre.entity';
import { AdminAuthGuard } from 'src/guards/admin.guard';



@Injectable()
export class GenreAdminService extends TypeOrmCrudService<Genre> {
  constructor(@InjectRepository(Genre) repo) {
    super(repo);
  }
}

@Crud({
  model: {
    type: Genre,
  },
})
@UseGuards(AdminAuthGuard)
@Controller("admin/genre")
export class GenreAdminController implements CrudController<Genre> {
  constructor(public service: GenreAdminService) {}
}


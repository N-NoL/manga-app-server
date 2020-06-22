import { Controller, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Crud, CrudController } from "@nestjsx/crud";
import { Format } from 'src/format/format.entity';
import { AdminAuthGuard } from 'src/guards/admin.guard';



@Injectable()
export class FormatAdminService extends TypeOrmCrudService<Format> {
  constructor(@InjectRepository(Format) repo) {
    super(repo);
  }
}

@Crud({
  model: {
    type: Format,
  },
})
@UseGuards(AdminAuthGuard)
@Controller("admin/format")
export class FormatAdminController implements CrudController<Format> {
  constructor(public service: FormatAdminService) {}
}


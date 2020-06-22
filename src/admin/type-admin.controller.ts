import { Controller, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Crud, CrudController } from "@nestjsx/crud";
import { Type } from 'src/type/type.entity';
import { AdminAuthGuard } from 'src/guards/admin.guard';



@Injectable()
export class TypeAdminService extends TypeOrmCrudService<Type> {
  constructor(@InjectRepository(Type) repo) {
    super(repo);
  }
}

@Crud({
  model: {
    type: Type,
  },
})
@UseGuards(AdminAuthGuard)
@Controller("admin/type")
export class TypeAdminController implements CrudController<Type> {
  constructor(public service: TypeAdminService) {}
}


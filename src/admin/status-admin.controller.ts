import { Controller, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Crud, CrudController } from "@nestjsx/crud";
import { Status } from 'src/status/status.entity';
import { AdminAuthGuard } from 'src/guards/admin.guard';



@Injectable()
export class StatusAdminService extends TypeOrmCrudService<Status> {
  constructor(@InjectRepository(Status) repo) {
    super(repo);
  }
}

@Crud({
  model: {
    type: Status,
  },
})
@UseGuards(AdminAuthGuard)
@Controller("admin/status")
export class StatusAdminController implements CrudController<Status> {
  constructor(public service: StatusAdminService) {}
}


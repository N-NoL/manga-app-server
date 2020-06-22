import { Controller, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './../user/user.entity';
import { Crud, CrudController } from "@nestjsx/crud";
import { AdminAuthGuard } from 'src/guards/admin.guard';



@Injectable()
export class UserAdminService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }
}

@Crud({
  model: {
    type: User,
  },
})
@UseGuards(AdminAuthGuard)
@Controller("admin/user")
export class UserAdminController implements CrudController<User> {
  constructor(public service: UserAdminService) {}
}


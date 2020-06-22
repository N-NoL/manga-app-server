import { Controller, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Crud, CrudController } from "@nestjsx/crud";
import { Comment } from 'src/comment/comment.entity';
import { AdminAuthGuard } from 'src/guards/admin.guard';



@Injectable()
export class CommentAdminService extends TypeOrmCrudService<Comment> {
  constructor(@InjectRepository(Comment) repo) {
    super(repo);
  }
}

@Crud({
  model: {
    type: Comment,
  },
})
@UseGuards(AdminAuthGuard)
@Controller("admin/comment")
export class CommentAdminController implements CrudController<Comment> {
  constructor(public service: CommentAdminService) {}
}


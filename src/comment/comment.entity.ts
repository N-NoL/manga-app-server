
import {Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, TreeLevelColumn, CreateDateColumn, ManyToOne, ManyToMany, OneToMany, BeforeInsert, AfterInsert, BaseEntity} from "typeorm";
import { Manga } from "src/manga/manga.entity";
import { User } from "src/user/user.entity";
import { UserToComment } from "./commentToUser.entity";

@Entity('comment')
export class Comment extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;


  @Column() 
  mangaId: number;
  @Column()
  userId: number;


  // @Column("int", { array: true, nullable:true})
  // path: [number];

  @Column("int", { array: true})
  rootPath: [number];
  // @Column()
  // post_id: number;

  // @Column()
  // post_type: number;
  @Column({default:0})
  value: number;

  @Column({length: 150, nullable:false})
  comment: string;


  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @ManyToOne(type => User, user => user.comments)
  user: User;

  @ManyToOne(type => Manga, manga => manga.comments)
  manga: Manga;

  @OneToMany(type => UserToComment, userToComment => userToComment.comment)
  public usersRated!: UserToComment[];

  @Column({default:0})
  banStatus!: number;
}
// comment: "1"
// comment_level: 0
// parent_comment: null
// post_id: "12023"
// post_page: 1
// post_type: "manga"
// root_id: null



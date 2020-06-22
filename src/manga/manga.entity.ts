import { Chapter } from '../chapter/chapter.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany,TreeChildren,Tree, AfterLoad, JoinColumn, ManyToMany, JoinTable, ManyToOne, InsertEvent, BeforeUpdate, OneToOne, BaseEntity } from 'typeorm';
import { Genre } from 'src/genre/genre.entity';
import { Status } from 'src/status/status.entity';
import { Type } from 'src/type/type.entity';
import { Format } from 'src/format/format.entity';
import { User } from './../user/user.entity';
import { Rating } from './rating/rating.entity';
import { Bookmark } from './bookmark/bookmark.entity';
import { Comment } from 'src/comment/comment.entity';
@Entity('manga')
export class Manga extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  imgUrl?: string;

  @Column()
  title!: string;

  @Column()
  englishTitle!: string;

  @Column()
  originalTitle!: string;


  @Column()
  author!: string;

  @Column("text",{array:true})
  otherTitles?: [string];

  @Column("text")
  description!: string;


  @Column()
  year!: number;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @ManyToMany(() => Genre, {cascade: true})
  @JoinTable()
  genres!: Genre[];


  @ManyToOne(() => Status, status => status.mangaList, {cascade: true})
  status!: Status;

  @ManyToOne(() => Type, type => type.mangaList, {cascade: true})
  type!: Type;

  // @ManyToOne(() => Format, format => format.mangaList, {cascade: true})
  // format!: Format;
  @ManyToMany(() => Genre, {cascade: true})
  @JoinTable()
  format: Format[];


  @ManyToMany(() => User, user => user.subscriptions, {cascade: true})
  @JoinTable()
  subscribers: User[];



  @OneToMany(() => Chapter, chapter => chapter.manga, {cascade: true})
  chapters: Chapter[];



  // manga.subscriber.ts  
  @OneToOne(() => Chapter, {cascade: true})
  @JoinColumn()
  lastChapter: Chapter;
  
  @Column({type:"bigint",default:0})
  chapterUpdateAt: number;
  
  @Column({default:0})
  chapterCount: number;

  @Column({default:0})
  viewsCount: number;


  @OneToMany(type => Bookmark, bookmark => bookmark.manga)
  bookmarks: Bookmark[];


  // rating
  // @Column({type:"jsonb", default:{count: 0, value: 0}})
  // rating: { count: number, value: number };

  @Column({default:0})
  ratingCount: number;

  @Column({type: "real", scale: 1, default:0})
  ratingValue: string;

  @OneToMany(type => Rating, rating => rating.manga)
  ratedByUsers: Rating[];

  @OneToMany(type => Comment, comment => comment.manga)
  comments: Comment[];


  @Column({default:1})
  banStatus!: number;
}
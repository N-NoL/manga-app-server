import { Manga } from './../manga/manga.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, BaseEntity } from 'typeorm';
import { Bookmark } from 'src/manga/bookmark/bookmark.entity';


@Entity('chapter')
export class Chapter extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type:"int"})
  volume: number;
  @Column({type: "real", scale: 1})
  chapter: string;
  @Column()
  title?: string;
  @Column({ type: "jsonb",select: false })
  imgList: {
    w: number;
    h: number;
    url: string;  
  }[]
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @Column()
  mangaId!: number;
  
  @ManyToOne(() => Manga, manga => manga.chapters)
  manga: Manga;
  
  @OneToMany(type => Bookmark, bookmark => bookmark.chapter)
  bookmarks: Bookmark[];
  

  @Column({default:1})
  banStatus!: number;
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, AfterLoad, JoinColumn, ManyToMany, JoinTable, ManyToOne, InsertEvent, BeforeUpdate, OneToOne, BaseEntity } from 'typeorm';
import { Genre } from 'src/genre/genre.entity';
import { Status } from 'src/status/status.entity';
import { Type } from 'src/type/type.entity';
import { Format } from 'src/format/format.entity';
import { User } from 'src/user/user.entity';
import { Manga } from '../manga.entity';
import { Chapter } from 'src/chapter/chapter.entity';



@Entity('bookmark')
export class Bookmark extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId!: number;

    @Column()
    chapterId!: number;

    @Column()
    mangaId!: number;

    @ManyToOne(( ) => Manga, manga => manga.bookmarks,{cascade:true})
    manga!: Manga;

    @ManyToOne(( ) => User, user => user.evaluatedManga,{cascade:true})
    user!: User;

    // @OneToOne(() => Chapter, {cascade: true})
    @ManyToOne(( ) => Chapter, chapter => chapter.bookmarks,{cascade:true}) 
    chapter!: Chapter;
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}
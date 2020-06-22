
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, AfterLoad, JoinColumn, ManyToMany, JoinTable, ManyToOne, InsertEvent, BeforeUpdate, OneToOne, BaseEntity } from 'typeorm';
import { Genre } from 'src/genre/genre.entity';
import { Status } from 'src/status/status.entity';
import { Type } from 'src/type/type.entity';
import { Format } from 'src/format/format.entity';
import { User } from 'src/user/user.entity';
import { Manga } from '../manga.entity';



@Entity()
export class Rating extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId!: number;

    @Column()
    mangaId!: number;

    // @Column({default:0})
    // value!: number;

    @Column({type: "real", scale: 1, default:0})
    value!: string;

    @ManyToOne(( ) => Manga, manga => manga.ratedByUsers)
    manga!: Manga;

    @ManyToOne(( ) => User, user => user.evaluatedManga)
    user!: User;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}
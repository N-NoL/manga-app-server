
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, BaseEntity } from 'typeorm';
import { Manga } from 'src/manga/manga.entity';

@Entity('status')
export class Status extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => Manga, manga => manga.status)
  mangaList: Manga[];
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, BaseEntity } from 'typeorm';
import { Manga } from 'src/manga/manga.entity';

@Entity('format')
export class Format extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
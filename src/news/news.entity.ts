
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, BaseEntity } from 'typeorm';
import { Manga } from 'src/manga/manga.entity';

@Entity('news')
export class News extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;
}
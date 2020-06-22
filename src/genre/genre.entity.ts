
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';

@Entity('genre')
export class Genre extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
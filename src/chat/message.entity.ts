
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { Manga } from 'src/manga/manga.entity';
import { User } from 'src/user/user.entity';
import { Chat } from './chat.entity';

@Entity('message')
export class Message extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.messages, {cascade: true})
  user: User;

  @Column()
  userId: number;

  @ManyToOne(type => Chat, chat => chat.messages, {cascade: true})
  chat: Chat;

  @Column()
  chatId: number;

  @Column({length: 150, nullable:false})
  text: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
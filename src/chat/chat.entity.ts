
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { Manga } from 'src/manga/manga.entity';
import { User } from 'src/user/user.entity';
import { Message } from './message.entity';

@Entity('chat')
export class Chat extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, {cascade: true})
  @JoinTable()
  users!: User[];

  @OneToMany(type => Message, message => message.chat)
  messages: Message[];

  @Column({default:'нет сообщений'})
  text: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
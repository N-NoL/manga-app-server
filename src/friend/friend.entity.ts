//friend
//Friend
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, BaseEntity } from 'typeorm';
import { Manga } from 'src/manga/manga.entity';
import { User } from 'src/user/user.entity';

@Entity('friend')
export class Friend extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: number;

  @Column()
  reseiverId: number;

  @ManyToOne(type => User, user => user.follow)
  public sender!: User;

  @ManyToOne(type => User, user => user.followers)
  public reseiver!: User;

  @Column({default:0})
  status: number;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
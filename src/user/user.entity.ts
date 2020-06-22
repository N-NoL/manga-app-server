
import { Entity,BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { Manga } from 'src/manga/manga.entity';
import { Chapter } from 'src/chapter/chapter.entity';
import { Rating } from 'src/manga/rating/rating.entity';
import { Comment } from 'src/comment/comment.entity';
import { UserToComment } from 'src/comment/commentToUser.entity';
import { Friend } from './../friend/friend.entity';
import { Message } from 'src/chat/message.entity';

@Entity('user')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  location: string;
  @Column({ default: '' })
  firstName: string;
  @Column({ default: '' })
  lastName: string;
  @Column({ default: 0 })
  gender: number;

  @Column({ select: false })
  password: string;
  @Column({default:"https://i.pinimg.com/564x/5a/73/9a/5a739a00ca2feecbc6e0a03a7a073f50.jpg"})
  imgUrl: string;
  @Column({default:"https://coverfiles.alphacoders.com/909/90989.jpg"})
  coverUrl: string;


  @ManyToMany(() => Manga, manga => manga.subscribers)
  subscriptions: Manga[];

  // @ManyToMany(() => Chapter, {cascade: true})
  // @JoinTable()
  // readChapters: Chapter[];

  // rating
  @OneToMany(type => Rating, rating => rating.user)
  evaluatedManga: Rating[];

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];
  

  @OneToMany(type => Message, message => message.user)
  messages: Message[];


  // @ManyToMany(type => Comment, comment => comment.usersRated )
  // ratedComments: Comment[];
  @OneToMany(type => UserToComment, userToComment => userToComment.user)
  public retedComments!: UserToComment[];

  

  @OneToMany(type => Friend, friend => friend.sender)
  follow: Friend[];
  
  @OneToMany(type => Friend, friend => friend.reseiver)
  followers: Friend[];

  @Column('boolean', { default:false })
  isAdmin: boolean

  @Column('boolean', { default:false })
  isOnline: boolean



  @Column('boolean', { default:true })
  showProfile: boolean

  @Column('boolean', { default:true })
  showStatus: boolean

  @Column('boolean', { default:false })
  friendliness: boolean

  @Column({default:0})
  banStatus!: number;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

}
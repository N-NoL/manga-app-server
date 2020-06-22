import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Comment} from './comment.entity'
import { User } from "src/user/user.entity";
@Entity()
export class UserToComment {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public userId!: number;

    @Column()
    public commentId!: number;

    @Column()
    public value!: number;

    @ManyToOne(type => Comment, comment => comment.usersRated,{cascade:true})
    public comment!: Comment;

    @ManyToOne(type => User, user => user.retedComments,{cascade:true})
    public user!: User;
}
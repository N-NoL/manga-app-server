import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser({username, password}): Promise<any> {
    const user = await this.userRepository.createQueryBuilder('user')
    .where('user.username =:username',{username})
    .addSelect("user.password")
    .getOne();
    // console.log('user========================')
    if(!user || user.password !== password){
      throw new HttpException('неправильное имя пользователя или пароль', HttpStatus.BAD_REQUEST);
    }
    // console.log('user',user)
    // const { password, ...result } = user;
    delete(user.password)
    
    return user;
  }

  async login(id) {
    console.log(id)
    const user:any = await this.getProfile(id)
    delete(user.password)
    const payload = { id, isAdmin:user.isAdmin };
    return {
      payload,
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
      user
    };
  }
  async registration({username,email,password}) {
    console.log({username,email,password})
    if(!(/^(?=.*[A-Za-z])[A-Za-z\d]{4,}$/.test(username)&&
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)&&
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    )){
      throw new HttpException('некоректные данные', HttpStatus.BAD_REQUEST);
    }
    const usernames = await this.userRepository.createQueryBuilder('user')
    .where('user.username =:username',{username})
    .getCount()
    const emails = await this.userRepository.createQueryBuilder('user')
    .where('user.email =:email',{email})
    .getCount()
    if(usernames){
      throw new HttpException('пользователь с таким ником уже существует', HttpStatus.BAD_REQUEST);
    }
    if(emails){
      throw new HttpException('эта электронная почта уже используется', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.save({username,email,password})
    if(user.id===1){
      return await this.userRepository.save({...user,isAdmin:true})
    }
    delete(user.password)
    return user
  }
  async getProfile(id: string): Promise<object>{
    console.log('id',id)
    const user = await this.userService.findById({id,userId:id});
    delete(user.password)
    return user
  }
}
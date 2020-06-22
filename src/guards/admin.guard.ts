import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    console.log('user',user)
    if(user.isAdmin){
      return user;
    } else {
      throw new HttpException('Hmmm...', HttpStatus.UNAUTHORIZED);
    }
  }

}
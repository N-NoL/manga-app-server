import { Controller, Request, Post, UseGuards, Get, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
  @Post('registration')
  async registration(@Body() dto) {
    const user = await this.authService.registration(dto);
    return this.authService.login(user.id);
  }
  @Post('login')
  async login(@Body() dto) {
    console.log('dto',dto)
    const user = await this.authService.validateUser(dto);
    // console.log(dto)
    return this.authService.login(user.id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    // console.log(req)
    return this.authService.getProfile(req.user.userId);
  }
}
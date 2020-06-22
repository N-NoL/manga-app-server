import { Controller, Get, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RatingService } from './rating.service';
import { Rating } from './rating.entity';

@Controller('manga/rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService){}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  setRating(@Body() param: { id:number, value:number }, @Request() req):Promise<object> {
    const userId = req.user.userId
    return this.ratingService.setRating({userId,value:param.value, mangaId:param.id})
  }
}

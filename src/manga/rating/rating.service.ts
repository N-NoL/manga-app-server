import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository } from 'typeorm'
import { User } from 'src/user/user.entity';
import { Manga } from 'src/manga/manga.entity';
import { Rating } from './rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Manga)
    private mangaRepository: Repository<Manga>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
  ) { }
  async setRating({userId,mangaId,value}):Promise<object>{
    const crntRating = await this.ratingRepository.findOne({userId,mangaId})
    if(value===null){
      const a =await this.ratingRepository.createQueryBuilder('rating').delete().where({userId,mangaId}).execute();
     
      console.log(a)
    }
    else {
      crntRating
      ?await this.ratingRepository.save({...crntRating, value})
      :await this.ratingRepository.save({userId, mangaId, value})
    }
    const params = await this.ratingRepository.createQueryBuilder("rating")
    .where({mangaId})
    .select("COUNT(*)", "ratingCount")
    .addSelect("AVG(rating.value)", "ratingValue")
    .getRawOne();
    params.ratingValue=params.ratingValue||0
    await this.mangaRepository
    .createQueryBuilder("manga")
    .update(Manga)
    .set(params)
    .where("id = :mangaId", {mangaId})
    .execute();


    return params
  }
}

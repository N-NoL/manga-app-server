import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository } from 'typeorm'
import { User } from 'src/user/user.entity';
import { Manga } from 'src/manga/manga.entity';
import { Bookmark } from './bookmark.entity';
import { Chapter } from 'src/chapter/chapter.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
  ) { }
  async setBookmark({userId,chapterId,mangaId}):Promise<object>{
    const chapter = await this.chapterRepository.findOne({id:chapterId,mangaId})
    if(!chapter){
      throw new HttpException('chapter not found', HttpStatus.NOT_FOUND);
    }
    const crntBookmark = await this.bookmarkRepository.findOne({userId,mangaId})
    if(crntBookmark){
      return await this.bookmarkRepository.save({...crntBookmark,chapterId})
    }
    return await this.bookmarkRepository.save({userId,mangaId,chapterId})
  }
  async removeBookmark({userId,mangaId}):Promise<object>{
    const crntBookmark = await this.bookmarkRepository.findOne({userId,mangaId})
    if(!crntBookmark){
      throw new HttpException('Bookmark not found', HttpStatus.NOT_FOUND);
    }
    return await this.bookmarkRepository.remove(crntBookmark)
  }
  async findUserBookmarks(userId):Promise<object>{
    const [list,count] = await this.bookmarkRepository
    .createQueryBuilder("bookmark")
    .where("bookmark.userId = :userId", {userId})
    .leftJoinAndSelect("bookmark.manga", "manga")
    .leftJoinAndSelect("bookmark.chapter", "chapter") 
    .getManyAndCount();
    return {list,count}
  }
}

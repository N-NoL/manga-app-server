
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Chapter } from './chapter.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Manga } from 'src/manga/manga.entity';
import { UpdateCharperDto, CreateCharperDto } from './chapter.dto';
import { Bookmark } from 'src/manga/bookmark/bookmark.entity';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
    @InjectRepository(Manga)
    private mangaRepository: Repository<Manga>,
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
  ){}
  findAll(): Promise<Chapter[]> {
    return this.chapterRepository.find({ relations: ["manga"] });
  }
  async findChapter(id): Promise<Chapter> {
    const chapter = await this.chapterRepository.createQueryBuilder('chapter')
    .where({id})
    .addSelect("chapter.imgList")
    .getOne()
    return chapter;
  }
  async readChapter({chapterId,userId}): Promise<Chapter> {
    const chapter = await this.chapterRepository.createQueryBuilder('chapter')
    .where({id:chapterId})
    .addSelect("chapter.imgList")
    .getOne()
    
    if(!chapter){
      throw new HttpException('chapter not found', HttpStatus.NOT_FOUND);
    }
    const crntBookmark = await this.bookmarkRepository.findOne({userId,mangaId:chapter.mangaId})
    if(!crntBookmark){
      await this.bookmarkRepository.save({userId,chapterId,mangaId:chapter.mangaId})
      return chapter
    }
    if(crntBookmark.chapterId<chapterId){
      await this.bookmarkRepository.save({...crntBookmark, chapterId})
    }
    return chapter
  }

  async create(dto: CreateCharperDto): Promise<Chapter> {
    const manga = await this.mangaRepository.findOne({id:dto.mangaId})
    if(manga){
      return await this.chapterRepository.save({...dto, manga});
    }
    throw new HttpException(`manga with id=${dto.mangaId} not found`, HttpStatus.FAILED_DEPENDENCY);
  }
  async update(dto: UpdateCharperDto): Promise<Chapter> {
    const chapter = await this.chapterRepository.findOne(dto.id)
    if(chapter){
      return await this.chapterRepository.save(dto);
    }
    throw new HttpException('chapter not found', HttpStatus.NOT_FOUND);
  }
  
  async delete(id: number): Promise<object> {
    const chapter = await this.chapterRepository.findOne({id}, {relations:['manga','manga.lastChapter']})
    if(!chapter){
      throw new HttpException('chapter not found', HttpStatus.NOT_FOUND);
    }
    if(chapter.manga.lastChapter.id == id){
      const manga = await this.mangaRepository
      .createQueryBuilder('manga')
      .where({id:chapter.manga.id})
      .leftJoinAndSelect("manga.chapters", "chapter")
      .orderBy('chapter.volume', 'DESC')
      .addOrderBy('chapter.chapter', 'DESC')
      .addOrderBy('chapter.createdAt', 'DESC')
      .getOne();
      manga.lastChapter=manga.chapters[1]
      await this.mangaRepository.save(manga)
    }
    const result = await this.chapterRepository.delete(id);
    if(result.affected){
      const manga = await this.mangaRepository
      .createQueryBuilder('manga')
      .leftJoinAndSelect("manga.chapters", "chapter")
      .where({id:chapter.manga.id})
      .getOne();
      manga.chapterCount=manga.chapters.length
      await this.mangaRepository.save(manga)
    }
    return result
  }
}

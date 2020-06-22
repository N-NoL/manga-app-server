import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository } from 'typeorm'
import { CreateMangaDto, UpdateMangaDto } from './manga.dto';
import { Genre } from 'src/genre/genre.entity';
import { Status } from 'src/status/status.entity';
import { Type } from 'src/type/type.entity';
import { Format } from 'src/format/format.entity';
import { Chapter } from 'src/chapter/chapter.entity';
import { User } from 'src/user/user.entity';
import { Manga } from 'src/manga/manga.entity';
import { Bookmark } from './bookmark/bookmark.entity';


@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private mangaRepository: Repository<Manga>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
    @InjectRepository(Format)
    private formatRepository: Repository<Format>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
  ) { }
  async searchManga({sub}): Promise<{ list: Manga[], total: number }> {
    console.log(sub)
    const [list, total] = await this.mangaRepository
    .createQueryBuilder("manga")
    .where({banStatus:0})
    .andWhere("manga.title LIKE :sub",{sub:`%${sub}%`})
    .orWhere("manga.englishTitle LIKE :sub",{sub:`%${sub}%`})
    .orWhere("manga.originalTitle LIKE :sub",{sub:`%${sub}%`})
    .take(60)
    .getManyAndCount();
    return {list, total}
  }

  async findList(filter,isUpd=false): Promise<{ list: Manga[], total: number }> {

    const dbQuery = this.mangaRepository
      .createQueryBuilder("manga")
      .where({banStatus:0})

    if(filter.includeGenre){
      const iids =(await this.mangaRepository
      .createQueryBuilder("manga")
      .innerJoinAndSelect("manga.genres", "genre", "genre.id IN (:...includeGenre)", filter)
      .select(['manga.id','genre.id'])
      .getMany()).filter(el=>el.genres.length===filter.includeGenre.length).map(el=>el.id)
      if(iids.length){
        dbQuery.andWhere("manga.id IN (:...iids)", {iids})
      } else {
        return { list:[], total:0 }
      }
    }
    if(filter.excludeGenre){
        const eids = (await this.mangaRepository
          .createQueryBuilder("manga")
          .innerJoinAndSelect("manga.genres", "genre", "genre.id IN (:...excludeGenre)", filter)
          .select(['manga.id'])
          .getMany()
        ).map(el=>el.id)
        if(eids.length){
          dbQuery.andWhere("manga.id NOT IN (:...eids)", {eids})
        }
    } 
      dbQuery
      .leftJoinAndSelect("manga.genres", "genre")
      .leftJoinAndSelect("manga.status", "status")
      .leftJoinAndSelect("manga.type", "type")
      .leftJoinAndSelect("manga.format", "format")
      .leftJoinAndSelect("manga.lastChapter", "chapter")
      if(isUpd) {
        const date = new Date();
        const lastWeek = new Date (date.setDate(date.getDate() - 7)).toISOString();
        dbQuery.andWhere('chapter.createdAt > :lastWeek',{lastWeek})
      }     
    if (filter.type) {
      console.log('type', filter.type)
      dbQuery.andWhere("type.id IN (:...type)", filter)
    }
    if (filter.status) {
      console.log('status', filter.status)
      dbQuery.andWhere("status.id IN (:...status)", filter)
    }
    if (filter.format) {
      console.log('format', filter.format)
      dbQuery.andWhere("format.id IN (:...format)", filter)
    }
    switch (filter.sort) {
      case 'rating':
        console.log('sort', 'rating')
        dbQuery.orderBy('manga.ratingValue', 'DESC')
        break;
      case 'name':
        console.log('sort', 'name')
        dbQuery.orderBy('manga.title', 'ASC')
        break;
      case 'views':
        console.log('sort', 'views')
        dbQuery.orderBy('manga.viewsCount', 'DESC')
        break;
      case 'date':
        console.log('sort', 'date')
        dbQuery.orderBy('manga.chapterUpdateAt', 'DESC')
        break;
      case 'create':
        console.log('sort', 'create')
        dbQuery.orderBy('manga.createdAt', 'DESC')
        break;
        case 'chapter':
        console.log('sort', 'chapter')
        dbQuery.orderBy('manga.chapterCount', 'DESC')
        break;
      default:
        dbQuery.orderBy('manga.ratingValue', 'DESC')
        break;
    }
    dbQuery.addOrderBy('chapter.volume', 'DESC')
    .addOrderBy('chapter.chapter', 'DESC')


    dbQuery
      .skip(filter.skip || 0)
      .take(filter.take && filter.take < 100 ? filter.take : 60)

    const [list, total] = await dbQuery.getManyAndCount();
    return { list, total }
  }


  async findUpdates(filter): Promise<{ list: object[], total: number}> {
    const L = await this.findList(filter,true)
    if(!L.total){
      return {total:0, list:[]}
    }
    const ids = L.list.map(el=>el.id)
    console.log('ids',ids)
    const date = new Date();
    const lastWeek = new Date (date.setDate(date.getDate() - 7)).toISOString();

    const dbQuery = this.mangaRepository
      .createQueryBuilder("manga")
      .whereInIds(ids)
      .leftJoinAndSelect("manga.chapters", "chapter")
      .andWhere('chapter.createdAt > :lastWeek',{lastWeek})
      
    switch (filter.sort) {
      case 'rating':
        console.log('sort', 'rating')
        dbQuery.orderBy('manga.ratingValue', 'DESC')
        break;
      case 'name':
        console.log('sort', 'name')
        dbQuery.orderBy('manga.title', 'ASC')
        break;
      case 'views':
        console.log('sort', 'views')
        dbQuery.orderBy('manga.viewsCount', 'DESC')
        break;
      case 'date':
        console.log('sort', 'date')
        dbQuery.orderBy('manga.createdAt', 'DESC')
        break;
      case 'chapter':
        console.log('sort', 'chapter')
        dbQuery.orderBy('manga.chapterCount', 'DESC')
        break;
      default:
        dbQuery.orderBy('manga.ratingValue', 'DESC')
        break;
    }
    const list = (await dbQuery.getMany()).map(manga=>{
      const updates = {...manga, updates:{
        count:manga.chapters.length,
        chapters:manga.chapters.slice(0,4)
      }}
      delete updates.chapters
      return updates
    })
    console.log("============")
    return { ...L,list }
  }





  async findOne(id: string): Promise<Manga> {
    const manga = await this.mangaRepository
    .createQueryBuilder("manga")
    .where({id})
    .leftJoinAndSelect("manga.genres", "genre")
    .leftJoinAndSelect("manga.status", "status")
    .leftJoinAndSelect("manga.type", "type")
    .leftJoinAndSelect("manga.format", "format")
    .leftJoinAndSelect("manga.chapters", "chapter","chapter.banStatus = 0")

    // .leftJoinAndSelect("manga.subscribers", "user")
    .orderBy('chapter.volume', 'DESC')
    .addOrderBy('chapter.chapter', 'DESC')
    .getOne();

    manga.viewsCount++;
    await this.mangaRepository
    .createQueryBuilder("manga")
    .update(Manga)
    .set({viewsCount:manga.viewsCount})
    .where("id = :id", { id })
    .execute();
    
    return manga
  }

  
  async update(dto: UpdateMangaDto): Promise<object> {
    const manga = await this.mangaRepository.findOne(dto.id)
    if (manga) {
      const genres = await this.genreRepository.findByIds(dto.genre)
      const status = await this.statusRepository.findOne(dto.status)
      const type = await this.typeRepository.findOne(dto.type)
      const format = dto.format?await this.formatRepository.findByIds(dto.format):[]
      return await this.mangaRepository.save({ ...dto, genres, status, type, format });
    }
    throw new HttpException('manga not found', HttpStatus.NOT_FOUND);
  }
  async create(dto: CreateMangaDto): Promise<Manga> {
    console.log(dto)
    const genres = await this.genreRepository.findByIds(dto.genre)
    const status = await this.statusRepository.findOne(dto.status)
    const type = await this.typeRepository.findOne(dto.type)
    const format = dto.format?await this.formatRepository.findByIds(dto.format):[]
    return await this.mangaRepository.save({ ...dto, genres, status, type, format });
  }
  async delete(id: string): Promise<object> {
    return await this.mangaRepository.delete(id);
  }


  
  async subscribe({userId,mangaId}){
    const manga =await this.userRepository.findOne({id:mangaId})
    if(manga.banStatus){
      throw new HttpException('BAN', HttpStatus.CONFLICT);
    }
    return await this.userRepository
    .createQueryBuilder()
    .relation(User, "subscriptions")
    .of(userId)
    .add(mangaId)
    .then(()=>{
      return {
        id:mangaId,
        method:'subscribe',
        status:'ok'
      }
    })
    .catch(()=>{
      throw new HttpException('already in subscriptions', HttpStatus.CONFLICT);
    })
  }

  async unsubscribe({userId,mangaId}){
    return await this.userRepository
    .createQueryBuilder()
    .relation(User, "subscriptions")
    .of(userId)
    .remove(mangaId)
    .then(()=>{
      return {
        id:mangaId,
        method:'unsubscribe',
        status:'ok'
      }
    })
    .catch(()=>{
      throw new HttpException('not in subscriptions', HttpStatus.CONFLICT);
    })
  }

  async findOneWithUserData({mangaId,userId}): Promise<Manga | object> {
    console.log(mangaId)
    const user = await this.userRepository.createQueryBuilder("user")
    .where({id:userId})
    .leftJoinAndSelect("user.subscriptions", "manga")
    .andWhere('manga.id = :mangaId',{mangaId})
    .getOne();
    // console.log(user)
    const manga = await this.mangaRepository
    .createQueryBuilder("manga")
    .where({id:mangaId})
    .leftJoinAndSelect("manga.genres", "genre")
    .leftJoinAndSelect("manga.status", "status")
    .leftJoinAndSelect("manga.type", "type")
    .leftJoinAndSelect("manga.format", "format")
    .leftJoinAndSelect("manga.chapters", "chapter","chapter.banStatus = 0")

    .orderBy('chapter.volume', 'DESC')
    .addOrderBy('chapter.chapter', 'DESC')
    .getOne();
    console.log(manga)
    manga.viewsCount++

    await this.mangaRepository
    .createQueryBuilder("manga")
    .update(Manga)
    .set({viewsCount:manga.viewsCount})
    .where("id = :id", { id:mangaId })
    .execute();
    
    const bookmark = await this.bookmarkRepository.findOne({userId,mangaId})

    return {...manga,subscribe:!!user, bookmark}
  }

}

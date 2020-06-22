import { Controller, Get, Post, UseGuards, Body, Request, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkService } from './bookmark.service';
import { Bookmark } from './bookmark.entity';

@Controller('manga/bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService){}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  setBookmark(@Body() param: { chapterId:number, mangaId:number }, @Request() req):Promise<object> {
    const userId = req.user.userId
    return this.bookmarkService.setBookmark({userId, chapterId:param.chapterId, mangaId:param.mangaId})
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  removeBookmark(@Body() param: { mangaId:number }, @Request() req):Promise<object> {
    const userId = req.user.userId
    return this.bookmarkService.removeBookmark({userId, mangaId:param.mangaId})
  }

  @Get(':id')
  getHistory(@Param() param) :Promise<object>{
    return this.bookmarkService.findUserBookmarks(param.id)
  }
}

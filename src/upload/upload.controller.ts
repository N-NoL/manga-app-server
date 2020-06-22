/* eslint-disable @typescript-eslint/camelcase */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const imgur = require('imgur');

import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
  cloud_name: "manga-sas",
  api_key: "867575666152858",
  api_secret: "AuLgccOuOmrqFGuSRJ4yP5yHpCo"
});
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');
import { Controller, Get, Put, Delete, Request, Body, Post, UseInterceptors,UploadedFile,UploadedFiles, UseGuards } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
imgur.setClientId('8c504d15b7b3917');

@Controller('upload')
export class UploadController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}



  uploadPicture(content: Buffer,folder:string,public_id?:string): Promise<any> {  
    return new Promise((resolve, reject) => {  
      cloudinary.uploader.upload_stream(  
        {  
          folder,  
          public_id
            // eager : [{ width : 400, height : 400, crop : 'crop', gravity : 'face'}]  
        }, (error, result) => {  
              if (error) {  
                  reject(error)
                } else {  
                  resolve(result)  
              }  
          }  
      ).end(content)  
    })  
  }



  @UseGuards(AuthGuard('jwt'))
  @Post('mangaImg')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    // console.log(file);
    if(file.size/(1024*1024)<3&&(file.mimetype==='image/gif'||file.mimetype==='image/jpeg'||file.mimetype==='image/png')){
      // console.log(file);
      const sharpBuffer = await sharp(file.buffer)
      .resize(250, 350)
      .jpeg()
      .toBuffer();
      // const img = await imgur.uploadBase64(sharpBuffer.toString('base64'))
      const img = await this.uploadPicture(sharpBuffer,'manga')
      console.log(img.url)
      return {
        url:img.url,
        w:img.width,
        h:img.height
      }
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('chapterImg')
  @UseInterceptors(FileInterceptor('file'))
  async uploadChapterFile(@UploadedFile() file) {
    // console.log(file);
    if(file.size/(1024*1024)<3&&(file.mimetype==='image/gif'||file.mimetype==='image/jpeg'||file.mimetype==='image/png')){
      // console.log(file);
      const img = await this.uploadPicture(file.buffer,'chapter')
      console.log(img.url)
      return {
        url:img.url.split('http://').join('https://'),
        w:img.width,
        h:img.height
      }
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('avatarImg')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatarFile(@UploadedFile() file, @Request() req) {
    const userId = req.user.userId
    console.log(userId);
    if(file.size/(1024*1024)<3&&(file.mimetype==='image/gif'||file.mimetype==='image/jpeg'||file.mimetype==='image/png')){
      // console.log(file);
      const sharpBuffer = await sharp(file.buffer)
      .resize(200, 200)
      .jpeg()
      .toBuffer();
      const img = await this.uploadPicture(sharpBuffer,'avatar',userId)
      await this.userRepository.createQueryBuilder()
      .update(User)
      .set({
        imgUrl:img.url.split('http://').join('https://'),
      })
      .where("id = :userId", {userId})
      .execute();

      console.log(img.url)
      return {
        url:img.url.split('http://').join('https://'),
        w:img.width,
        h:img.height
      }
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('coverImg')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCoverFile(@UploadedFile() file, @Request() req) {
    const userId = req.user.userId
    console.log(userId);
    if(file.size/(1024*1024)<3&&(file.mimetype==='image/gif'||file.mimetype==='image/jpeg'||file.mimetype==='image/png')){
      // console.log(file);
      const sharpBuffer = await sharp(file.buffer)
      .resize(1500, 450)
      .jpeg({ quality: 100 })
      .toBuffer();
      const img = await this.uploadPicture(sharpBuffer,'cover',userId)
      await this.userRepository.createQueryBuilder()
      .update(User)
      .set({
        coverUrl:img.url.split('http://').join('https://'),
      })
      .where("id = :userId", {userId})
      .execute();

      console.log(img.url)
      return {
        url:img.url.split('http://').join('https://'),
        w:img.width,
        h:img.height
      }
    }
  }
  // @Post('chapterImgs')
  // @UseInterceptors(FilesInterceptor('files'))
  // async uploadFiles(@UploadedFiles() files) {
  //   console.log(files);
  //   files.filter(file=>(file.size/(1024*1024)<10&&(file.mimetype==='image/gif'||file.mimetype==='image/jpeg'||file.mimetype==='image/png')))
  //   const imgs = await imgur.uploadImages(files.map(file=>file.buffer.toString('base64')), 'Base64' /*, albumId */)
  //   return {
  //     list:imgs.map(img=>({url:img.link,w:img.width,h:img.height}))
  //   }
  // }
}



export class CreateCharperDto {
  mangaId: number;

  volume: number;
  
  chapter: string;
  
  title?: string;
  
  imgList: {
    w: number;
    h: number;
    url: string;
  }[]
}

export class UpdateCharperDto {
  
  id: number;
  
  volume: number;
  
  chapter: string;
  
  title?: string;
 
  imgList: {
    w: number;
    h: number;
    url: string;
  }[]
}



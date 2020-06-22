

export class CreateMangaDto {
 
  
  imgUrl?: string;
 
  title: string;
 
  englishTitle: string;
  
  originalTitle?: string;
  
  otherTitles?: string[];
  
  description?: string;
 
  genre: number[];
 
  format: number[];
 
  type: number;
 
  status: number;
 
  year: number;
}

export class UpdateMangaDto {
 
  id: number;

  
  imgUrl?: string;
 
  title: string;
 
  englishTitle: string;
  
  originalTitle?: string;
  
  otherTitles?: string[];
  
  description?: string;
 
  genre: number[];
 
  format: number[];
 
  type: number;
 
  status: number;
 
  year: number;
}


export class QueryMangaDto {
  dir: string;
  format: number[];
  includeGenres: number[];
  sort: number;
  status: number[];
  types: number[];
}




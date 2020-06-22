
export class CreateUserDto {
  id: number;
  
  username: string;
  
  password: string;
  
}

export class UpdateUserDto {
  username: string;
  
  password: string;
}
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOperationAnnounceDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @IsNotEmpty()
  @IsString()
  category: string;
  
  @IsNotEmpty()
  @IsString()
  onsaledate: string;
  
  @IsNotEmpty()
  @IsString()
  nosaledate: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

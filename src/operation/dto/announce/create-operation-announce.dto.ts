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
  onsaleDate: string;
  
  @IsNotEmpty()
  @IsString()
  nosaleDate: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  //cookie抓不到，備案
  @IsNotEmpty()
  @IsString()
  token: string;
}

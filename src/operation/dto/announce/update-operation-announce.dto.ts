import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOperationAnnounceDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  category: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  onsaleDate: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nosaleDate: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
  
  //cookie抓不到，備案
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;
}

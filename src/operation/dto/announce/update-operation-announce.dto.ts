import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOperationAnnounceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  onsaleDate: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nosaleDate: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetOperationBanDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  page:string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  pageSize:string;
}

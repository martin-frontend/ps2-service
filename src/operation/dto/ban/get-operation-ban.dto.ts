import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetOperationBanDTO {
  @IsNotEmpty()
  @IsString()
  @Type(()=>String)
  @ApiProperty()
  page:string;
  
  @IsNotEmpty()
  @IsString()
  @Type(()=>String)
  @ApiProperty()
  pageSize:string;
}

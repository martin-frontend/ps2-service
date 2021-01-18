import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class GetOperationBanDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  isbanned:string;//0(不傳):全部, 1:只回傳停權中

  @ApiProperty()
  @IsOptional()
  @IsString()
  page:string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  pageSize:string;
}

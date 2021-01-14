import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetOperationBanDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  page:string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pageSize:string;
}

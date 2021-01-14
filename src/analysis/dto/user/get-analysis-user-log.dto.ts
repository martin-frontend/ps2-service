import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetAnalysisUserLogDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  account:string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  page:string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pageSize:string;
}

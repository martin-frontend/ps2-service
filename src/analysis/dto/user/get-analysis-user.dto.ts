import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetAnalysisUserDTO {
  @IsOptional()
  @IsString()
  account:string;
  
  @IsOptional()
  @IsString()
  accountName:string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  startDate: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  endDate: string;

  @IsOptional()
  @IsString()
  page:string;

  @IsOptional()
  @IsString()
  pageSize:string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetAnalysisUserDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  account:string;
  
  @ApiProperty()
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

  @ApiProperty()
  @IsOptional()
  @IsString()
  page:string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pageSize:string;
}

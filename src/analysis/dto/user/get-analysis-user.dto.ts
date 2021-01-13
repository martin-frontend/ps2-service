import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetAnalysisUserDTO {
  @IsOptional()
  @IsString()
  account:string;
  
  @IsOptional()
  @IsString()
  accountName:string;
  
  @IsOptional()
  @IsString()
  startDate: string;
  
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

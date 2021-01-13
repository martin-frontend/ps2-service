import { IsNotEmpty, IsString } from 'class-validator';

export class GetAnalysisUserLogDTO {
  @IsNotEmpty()
  @IsString()
  account:string;

  @IsNotEmpty()
  @IsString()
  page:string;

  @IsNotEmpty()
  @IsString()
  pageSize:string;
}

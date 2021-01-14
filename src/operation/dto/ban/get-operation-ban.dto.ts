import { IsNotEmpty, IsString } from 'class-validator';

export class GetOperationBanDTO {
  @IsNotEmpty()
  @IsString()
  page:string;

  @IsNotEmpty()
  @IsString()
  pageSize:string;
}

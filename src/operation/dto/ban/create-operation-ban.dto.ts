import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOperationBanDTO {
  @IsNotEmpty()
  @IsString()
  account: string;
  
  @IsNotEmpty()
  @IsString()
  releaseDate: string;

  @IsString()
  state: string;

  @IsString()
  reason: string;
}

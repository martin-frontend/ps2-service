import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOperationBanDTO {
  @IsNotEmpty()
  @IsString()
  account: string;
  
  @IsString()
  releaseDate: string;

  @IsString()
  releaseState: string;

  @IsString()
  reason: string;
}

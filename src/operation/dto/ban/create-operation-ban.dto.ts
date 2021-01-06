import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateOperationBanDTO {
  @IsNotEmpty()
  @IsString()
  account: string;

  @IsNotEmpty()
  @IsString()
  bannedDate: string;

  @IsNotEmpty()
  @IsString()
  releaseDate: string;
}

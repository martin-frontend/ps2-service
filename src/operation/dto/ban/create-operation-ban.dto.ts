import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOperationBanDTO {
  @IsNotEmpty()
  @IsString()
  account: string;
  
  @IsNotEmpty()
  @IsString()
  releaseDate: string;

  @IsNotEmpty()
  @IsString()
  releaseState: string;

  @IsOptional()
  @IsString()
  reason: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnalysisUserDTO {
  @IsNotEmpty()
  @IsString()
  account: string;

  @IsNotEmpty()
  @IsString()
  accountName: string;
}

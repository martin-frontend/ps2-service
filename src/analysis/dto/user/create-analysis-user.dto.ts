import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnalysisUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  account: string;

  @IsNotEmpty()
  @IsString()
  accountName: string;
}

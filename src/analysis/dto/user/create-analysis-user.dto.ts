import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnalysisUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  account: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountName: string;
}

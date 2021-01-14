import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnalysisUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  account: string;

  @IsNotEmpty()
  @IsString()
  accountName: string;
}

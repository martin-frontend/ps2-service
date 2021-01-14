import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  account: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

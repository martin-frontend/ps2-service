import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserInfoDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;
}

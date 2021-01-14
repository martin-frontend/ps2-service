import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;
}

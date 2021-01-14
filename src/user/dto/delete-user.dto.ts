import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;
}

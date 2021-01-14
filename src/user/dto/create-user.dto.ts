import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  account: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roleId: string;
}

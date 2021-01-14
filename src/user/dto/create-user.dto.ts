import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  account: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  roleId: string;
}

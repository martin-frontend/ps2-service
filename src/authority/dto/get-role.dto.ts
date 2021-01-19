import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetRoleDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  page:string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  pageSize:string;
}

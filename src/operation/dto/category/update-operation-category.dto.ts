import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOperationCategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;  
}

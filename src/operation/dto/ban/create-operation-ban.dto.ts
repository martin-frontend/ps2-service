import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOperationBanDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  account: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  releaseDate: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  releaseState: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  reason: string;
}

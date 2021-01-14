import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOperationBanDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  account: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  releaseDate: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  releaseState: string;
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  reason: string;
}

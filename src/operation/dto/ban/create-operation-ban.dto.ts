import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOperationBanDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  account: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  releaseDate: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  releaseState: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  reason: string;
}

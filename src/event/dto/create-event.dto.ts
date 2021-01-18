import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEventDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  eventId: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  event: string;
}

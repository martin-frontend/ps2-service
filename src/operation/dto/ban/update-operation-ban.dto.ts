import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateOperationBanDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    id: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    releaseDate: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    releaseState: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    reason: string;
}

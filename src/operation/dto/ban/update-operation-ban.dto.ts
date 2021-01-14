import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateOperationBanDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    releaseDate: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    releaseState: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    reason: string;
}

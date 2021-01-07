import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOperationBanDTO {
    @IsNotEmpty()
    @IsString()
    id: string;
    
    @IsNotEmpty()
    @IsString()
    releaseDate: string;
}

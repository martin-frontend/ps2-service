
import {IsNotEmpty,IsString} from "class-validator"

export class CreateAnalysisEventDTO {
    @IsNotEmpty()
    @IsString()
    account: string;
    
    @IsNotEmpty()
    @IsString()
    event: string;

    @IsNotEmpty()
    @IsString()
    data: string;
}

import {IsDate, IsNotEmpty,IsString} from "class-validator"

export class CreateOperationBanDTO {
    @IsNotEmpty()
    @IsString()
    account: string;
    
    @IsNotEmpty()
    @IsString()
    bannedDate: String;

    @IsNotEmpty()
    @IsString()
    releaseDate: String;
}
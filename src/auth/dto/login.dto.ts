
import {IsNotEmpty,IsString} from "class-validator"

export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    account: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
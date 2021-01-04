
import {IsNotEmpty,IsString} from "class-validator"

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    account: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsString()
    roleId: string;
}
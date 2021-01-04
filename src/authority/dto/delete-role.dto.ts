
import {IsNotEmpty,IsString} from "class-validator"
export class DeleteRoleDTO {
    @IsNotEmpty()
    @IsString()
    id: string;
}
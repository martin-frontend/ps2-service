import { IsNotEmpty, IsString } from 'class-validator';
export class CreateRoleDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  roles: string;
}

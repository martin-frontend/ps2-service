import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateRoleDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  roles: string;
}

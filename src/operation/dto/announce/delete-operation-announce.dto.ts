import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteOperationAnnounceDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
}

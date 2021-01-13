import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOperationCategoryDTO {
  @IsNotEmpty()
  @IsString()
  category: string;
  
}

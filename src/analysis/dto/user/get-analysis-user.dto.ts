import { IsNotEmpty, IsString } from 'class-validator';

export class GetAnalysisUserDTO {
  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  // @IsNotEmpty()
  // @IsString()
  // mode: string;
}

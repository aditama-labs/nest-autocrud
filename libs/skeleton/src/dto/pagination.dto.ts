import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { IPaginationParam } from '../interfaces/pagination-param.interface';

export class PaginationParamDTO implements IPaginationParam {
  @IsNotEmpty()
  @IsNumber()
  @Transform((data) => parseInt(data.value))
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform((data) => parseInt(data.value))
  limit: number;
}

import { IPaginationParam } from '../interfaces/pagination-param.interface';
import { DefaultProcess } from './default.process';

export class PaginationProcess extends DefaultProcess {
  params: IPaginationParam;
}

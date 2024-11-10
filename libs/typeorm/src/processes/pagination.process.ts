import { PaginationProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { IPaginationParam } from '@aditama-labs/nest-autocrud/skeleton/src/interfaces/pagination-param.interface';
import { TypeORMProcess } from './typeorm.process';

export class TypeORMPaginationProcess<T>
  extends TypeORMProcess<T>
  implements PaginationProcess
{
  params: IPaginationParam;

  async process() {
    const { page, limit } = this.params;
    const skip = (page - 1) * limit;

    this.result = await this.service.getRepository().find({
      skip,
      take: limit,
    });
  }
}

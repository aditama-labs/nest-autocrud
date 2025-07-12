import { PaginationProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';
import { IPaginationParam } from '@aditama-labs/nest-autocrud/skeleton/src/interfaces/pagination-param.interface';

export class PrismaPaginationProcess
  extends PrismaProcess
  implements PaginationProcess
{
  total: number;
  params: IPaginationParam;

  async process() {
    const { page, limit } = this.params;
    const skip = (page - 1) * limit;

    // Get total count
    this.total = await this.getDelegate().count();

    this.result = await this.getDelegate().findMany({
      skip,
      take: limit,
    });
  }
}

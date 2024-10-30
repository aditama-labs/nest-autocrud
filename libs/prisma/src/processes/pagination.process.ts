import { PaginationProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaPaginationProcess
  extends PrismaProcess
  implements PaginationProcess
{
  public params: { page: number; limit: number };
  private result;

  async process(): Promise<any> {
    const { page, limit } = this.params;
    const skip = (page - 1) * limit;

    this.result = await this.getDelegate().findMany({
      skip,
      // @TODO: I don't know why this actually string even the type is number, without parseInt it will throw error
      take: parseInt(limit.toString(), 10),
    });
  }

  output() {
    return this.result;
  }
}

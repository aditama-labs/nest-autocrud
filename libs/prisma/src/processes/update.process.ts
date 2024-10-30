import { UpdateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaUpdateProcess
  extends PrismaProcess
  implements UpdateProcess
{
  public id: any;
  public data: any;
  private result: any;

  async process(): Promise<any> {
    this.result = await this.getDelegate().update({
      data: this.data,
      where: { id: this.id },
    });
  }

  output() {
    return this.result;
  }
}

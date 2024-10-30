import { CreateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaCreateProcess
  extends PrismaProcess
  implements CreateProcess
{
  public data;
  public result;

  async process(): Promise<any> {
    this.result = await this.getDelegate().create({
      data: this.data,
    });
  }

  output() {
    this.result;
  }
}

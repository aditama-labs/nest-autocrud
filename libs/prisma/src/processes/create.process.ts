import { CreateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaCreateProcess
  extends PrismaProcess
  implements CreateProcess
{
  private data;

  setData(data) {
    this.data = data;
  }

  async process(): Promise<any> {
    await this.getDelegate().create(this.data);
  }
}

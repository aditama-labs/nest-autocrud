import { CreateProcess } from '@autocrud/skeleton/processes/create.process';
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

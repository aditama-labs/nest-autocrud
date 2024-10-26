import { ListProcess } from '@autocrud/skeleton/processes/list.process';
import { PrismaProcess } from './prisma.process';

export class PrismaListProcess extends PrismaProcess implements ListProcess {
  private data;

  async process(): Promise<any> {
    this.data = await this.getDelegate().findMany();
  }

  result() {
    return this.data;
  }
}

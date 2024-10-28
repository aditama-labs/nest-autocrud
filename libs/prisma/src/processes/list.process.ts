import { ListProcess } from '@autocrud/skeleton/processes/list.process';
import { PrismaProcess } from './prisma.process';

export class PrismaListProcess extends PrismaProcess implements ListProcess {
  private data: any;

  async process(): Promise<any> {
    this.data = await this.getDelegate().findMany();
  }

  result() {
    console.log('ASDASDASDASD');
    return this.data;
  }
}

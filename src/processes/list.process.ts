import { PrismaProcess } from '@autocrud/prisma/processes/prisma.process';
import { ListProcess } from '@autocrud/skeleton/processes/list.process';

export class AppListProcess extends PrismaProcess implements ListProcess {
  private data: any;

  async process(): Promise<any> {
    console.log('Hello World');
    super.process();
  }

  result() {
    return this.data;
  }
}

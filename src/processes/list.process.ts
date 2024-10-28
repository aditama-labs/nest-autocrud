import { PrismaListProcess } from '@autocrud/prisma/processes/list.process';

export class AppListProcess extends PrismaListProcess {
  async process(): Promise<any> {
    console.log('Hello World');
    super.process();
  }

  result() {
    return [];
  }
}

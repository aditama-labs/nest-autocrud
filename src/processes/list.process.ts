import { PrismaListProcess } from '@aditama-labs/nest-autocrud/prisma';

export class AppListProcess extends PrismaListProcess {
  async process(): Promise<any> {
    console.log('Hello World');
    super.process();
  }

  output() {
    return [];
  }
}

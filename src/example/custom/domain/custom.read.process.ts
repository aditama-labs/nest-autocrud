import { PrismaReadProcess } from '@aditama-labs/nest-autocrud/prisma';

export class CustomReadProcess extends PrismaReadProcess {
  customResult;

  async before(): Promise<any> {
    console.log('The ID requested in path parameter', this.identity);
  }
  async after(): Promise<any> {
    this.customResult = {
      ...super.output(),
      custom_code: 'XXXX',
    };
  }

  output() {
    return this.customResult;
  }
}

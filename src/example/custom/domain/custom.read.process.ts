import { PrismaReadProcess } from '@aditama-labs/nest-autocrud/prisma';

export class CustomReadProcess extends PrismaReadProcess {
  customResult;

  async before(): Promise<any> {
    console.log('The ID requested in path parameter', this.identityData);
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

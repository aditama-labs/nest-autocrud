import { PrismaListProcess } from '@aditama-labs/nest-autocrud/prisma';

export class CustomListProcess extends PrismaListProcess {
  async before(): Promise<any> {
    console.log('This is custom logic before query to database');
  }

  output() {
    console.log('You can modify the output here');
    return super.output();
  }
}

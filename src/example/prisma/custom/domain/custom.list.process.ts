import { PrismaListProcess } from '@aditama-labs/nest-autocrud/prisma';

export class CustomListProcess extends PrismaListProcess {
  async before(): Promise<any> {
    console.log('This is custom logic before query to database');
  }

  output() {
    this.result = this.result.map((item) => {
      // Custom logic to modify each item in the result
      const temp = {
        ...item,
        todo: item['Todo'],
      };
      // Remove the 'Todo' relation from the result
      delete temp['Todo'];
      return temp;
    });
    return super.output();
  }
}

import { CreateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaCreateProcess
  extends PrismaProcess
  implements CreateProcess
{
  private dataInsert;
  private dataResult;

  setData(data) {
    this.dataInsert = data;
  }

  async process(): Promise<any> {
    this.dataResult = await this.getDelegate().create(this.dataInsert);
  }

  result() {
    this.dataResult;
  }
}

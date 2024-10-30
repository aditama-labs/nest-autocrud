import { CreateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaUpdateProcess
  extends PrismaProcess
  implements CreateProcess
{
  private dataResult: any;
  private dataUpdate: any;
  private id: any;

  async process(): Promise<any> {
    this.dataResult = await this.getDelegate().update({
      data: this.dataUpdate,
      where: { id: this.id },
    });
  }

  result() {
    return this.dataResult;
  }
}

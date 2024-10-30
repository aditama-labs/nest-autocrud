import { CreateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaDeleteProcess
  extends PrismaProcess
  implements CreateProcess
{
  private dataResult: any;
  private id: any;

  async process(): Promise<any> {
    this.dataResult = await this.getDelegate().delete({
      where: { id: this.id },
    });
  }

  output() {
    return this.dataResult;
  }
}

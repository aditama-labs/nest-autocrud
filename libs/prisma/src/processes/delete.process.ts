import { DeleteProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaDeleteProcess
  extends PrismaProcess
  implements DeleteProcess
{
  public identity: any;

  async process(): Promise<any> {
    this.result = await this.getDelegate().delete({
      where: { id: this.identity },
    });
  }
}

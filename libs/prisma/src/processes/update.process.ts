import { UpdateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaUpdateProcess
  extends PrismaProcess
  implements UpdateProcess
{
  public identity: any;
  public payload: any;

  async process(): Promise<any> {
    this.result = await this.getDelegate().update({
      data: this.payload,
      where: { id: this.identity },
    });
  }
}

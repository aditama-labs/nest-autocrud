import { UpdateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaUpdateProcess
  extends PrismaProcess
  implements UpdateProcess
{
  public identity;
  public payload;

  async process() {
    this.result = await this.getDelegate().update({
      data: this.payload,
      where: { id: this.identity },
    });
  }
}

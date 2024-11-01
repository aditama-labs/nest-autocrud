import { ReadProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaReadProcess extends PrismaProcess implements ReadProcess {
  public identity;

  async process() {
    this.result = await this.getDelegate().findUnique({
      where: { id: this.identity },
    });
  }
}

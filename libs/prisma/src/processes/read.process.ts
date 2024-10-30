import { ReadProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaReadProcess extends PrismaProcess implements ReadProcess {
  public id;
  private result;

  async process(): Promise<any> {
    this.result = await this.getDelegate().findUnique({
      where: { id: this.id },
    });
  }

  output() {
    return this.result;
  }
}

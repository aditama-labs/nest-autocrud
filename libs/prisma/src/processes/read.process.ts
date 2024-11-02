import { ReadProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaReadProcess extends PrismaProcess implements ReadProcess {
  public identityData;
  public identityKey: string = 'id';

  async process() {
    this.result = await this.getDelegate().findUnique({
      where: { [this.identityKey]: this.identityData },
    });
  }
}

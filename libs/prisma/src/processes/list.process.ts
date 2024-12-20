import { ListProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaListProcess extends PrismaProcess implements ListProcess {
  async process() {
    this.result = await this.getDelegate().findMany();
  }
}

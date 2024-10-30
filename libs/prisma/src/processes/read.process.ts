import { CreateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { PrismaProcess } from './prisma.process';

export class PrismaReadProcess extends PrismaProcess implements CreateProcess {
  private data: any;
  private id: any;

  async process(): Promise<any> {
    this.data = await this.getDelegate().findUnique({
      where: { id: this.id },
    });
  }

  output() {
    return this.data;
  }
}

import { CreateProcess } from '@autocrud/skeleton/processes/create.process';

export class PrismaCreateProcess extends CreateProcess {
  async process(): Promise<any> {
    this.prisma['asd'].create({
      data,
    });
  }
}

import { CreateProcess } from '@autocrud/skeleton/processes/create.process';

export class PrismaCreateProcess implements CreateProcess {
  initialization();
  before();
  begin();

  process(): T {
    this.prisma['asd'].create({
      data,
    });
  }

  end();
  after();
  result();
}

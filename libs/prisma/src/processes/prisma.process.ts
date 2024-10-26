import { DefaultProcess } from '@autocrud/skeleton/processes/default.process';
import { Inject } from '@nestjs/common';
import { PRISMA_DELEGATE } from '../constants';

export class PrismaProcess extends DefaultProcess {
  constructor(
    @Inject(PRISMA_DELEGATE)
    private delegate: any,
  ) {
    super();
  }

  get getDelegate() {
    return this.delegate;
  }
}

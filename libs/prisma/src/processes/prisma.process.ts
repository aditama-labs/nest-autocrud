import { DefaultProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { Inject, Injectable } from '@nestjs/common';
import { PRISMA_DELEGATE } from '../constants';

@Injectable()
export class PrismaProcess extends DefaultProcess {
  constructor(
    @Inject(PRISMA_DELEGATE)
    private delegate,
  ) {
    super();
  }

  getDelegate() {
    return this.delegate;
  }
}

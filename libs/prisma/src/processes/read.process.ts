import { ReadProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { Inject } from '@nestjs/common';
import { PRISMA_DELEGATE, PRISMA_RELATION } from '../constants';
import { PrismaService } from '../prisma.service';
import { PrismaProcess } from './prisma.process';
import { convertRelationToIncludesPrisma } from '../utils';

export class PrismaReadProcess extends PrismaProcess implements ReadProcess {
  public identityData;
  public identityKey: string = 'id';

  constructor(
    @Inject(PRISMA_RELATION) private readonly relation: string[],
    // Injecting the Prisma delegate
    @Inject(PRISMA_DELEGATE)
    delegate,
    // Injecting the Prisma service
    prisma: PrismaService,
  ) {
    super(delegate, prisma);
  }

  async process() {
    this.result = await this.getDelegate().findUnique({
      where: { [this.identityKey]: this.identityData },
      include: convertRelationToIncludesPrisma(this.relation),
    });
  }
}

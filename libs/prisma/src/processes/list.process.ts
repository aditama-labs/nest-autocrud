import { ListProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { Inject } from '@nestjs/common';
import { PRISMA_DELEGATE, PRISMA_RELATION } from '../constants';
import { PrismaService } from '../prisma.service';
import { convertRelationToIncludesPrisma } from '../utils';
import { PrismaProcess } from './prisma.process';

export class PrismaListProcess extends PrismaProcess implements ListProcess {
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
    this.result = await this.getDelegate().findMany({
      include: convertRelationToIncludesPrisma(this.relation),
    });
  }
}

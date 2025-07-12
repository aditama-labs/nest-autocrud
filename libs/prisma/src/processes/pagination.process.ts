import {
  PRISMA_DELEGATE,
  PRISMA_RELATION,
} from '@aditama-labs/nest-autocrud/prisma/src/constants';
import { PrismaService } from '@aditama-labs/nest-autocrud/prisma/src/prisma.service';
import { PrismaProcess } from '@aditama-labs/nest-autocrud/prisma/src/processes/prisma.process';
import { convertRelationToIncludesPrisma } from '@aditama-labs/nest-autocrud/prisma/src/utils';
import { PaginationProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { IPaginationParam } from '@aditama-labs/nest-autocrud/skeleton/src/interfaces/pagination-param.interface';
import { Inject } from '@nestjs/common';

export class PrismaPaginationProcess
  extends PrismaProcess
  implements PaginationProcess
{
  total: number;
  params: IPaginationParam;

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
    const { page, limit } = this.params;
    const skip = (page - 1) * limit;

    // Get total count
    this.total = await this.getDelegate().count();

    this.result = await this.getDelegate().findMany({
      skip,
      take: limit,
      include: convertRelationToIncludesPrisma(this.relation),
    });
  }
}

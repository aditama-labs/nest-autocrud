import { PrismaService } from '../prisma.service';
import {
  PrismaCreateProcess,
  PrismaDeleteProcess,
  PrismaPaginationProcess,
  PrismaReadProcess,
  PrismaUpdateProcess,
} from '../processes';
import { PrismaListProcess } from '../processes/list.process';

export interface PrismaModuleOptions {
  delegate: (prisma: PrismaService) => unknown;
  processCreate?: typeof PrismaCreateProcess;
  processDelete?: typeof PrismaDeleteProcess;
  processList?: typeof PrismaListProcess;
  processPagination?: typeof PrismaPaginationProcess;
  processRead?: typeof PrismaReadProcess;
  processUpdate?: typeof PrismaUpdateProcess;
}

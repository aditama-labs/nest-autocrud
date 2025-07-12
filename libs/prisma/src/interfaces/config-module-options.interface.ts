import { PrismaService } from '../prisma.service';

// @TODO: Find way to use typesafe in each of the process property
// Known Issue:
// - You cannot be able modified the constructor extended to each process
export interface PrismaModuleOptions {
  delegate: (prisma: PrismaService) => any;
  processCreate?;
  processDelete?;
  processList?;
  processPagination?;
  processRead?;
  processUpdate?;
  // This is used for relation
  relation?: string[];
}

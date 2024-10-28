import { PrismaService } from '../prisma.service';

export interface PrismaModuleOptions {
  delegate: (prisma: PrismaService) => any;
  processList?: any;
}

import { PrismaService } from '../prisma.service';
import { PrismaListProcess } from '../processes/list.process';

export interface PrismaModuleOptions {
  delegate: (prisma: PrismaService) => any;
  processList: typeof PrismaListProcess;
}

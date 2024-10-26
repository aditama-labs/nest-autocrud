import { DeleteProcess } from '@autocrud/skeleton/processes/delete.process';
import { Prisma } from '@prisma/client';

export abstract class PrismaDeleteProcess implements DeleteProcess {
  abstract initialization();
  abstract before();
  abstract begin();
  abstract process();
  abstract end();
  abstract after();
  abstract result();
}

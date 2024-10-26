import { ReadProcess } from '@autocrud/skeleton/processes/read.process';

export abstract class PrismaReadProcess implements ReadProcess {
  abstract initialization();
  abstract before();
  abstract begin();
  abstract process();
  abstract end();
  abstract after();
  abstract result();
}

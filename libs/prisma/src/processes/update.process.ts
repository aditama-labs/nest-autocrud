import { UpdateProcess } from '@autocrud/skeleton/processes/update.process';

export abstract class PrismaUpdateProcess implements UpdateProcess {
  abstract initialization();
  abstract before();
  abstract begin();
  abstract process();
  abstract end();
  abstract after();
  abstract result();
}

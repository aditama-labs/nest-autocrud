import { ListProcess } from '@autocrud/skeleton/processes/list.process';

export abstract class PrismaListProcess implements ListProcess {
  abstract initialization();
  abstract before();
  abstract begin();
  abstract process();
  abstract end();
  abstract after();
  abstract result();
}

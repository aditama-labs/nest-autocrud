import { BatchUpdateProcess } from '@autocrud/skeleton/processes/batch/update.process';

export abstract class PrismaBatchUpdateProcess implements BatchUpdateProcess {
  abstract initialization();
  abstract before();
  abstract begin();
  abstract process();
  abstract end();
  abstract after();
  abstract result();
}

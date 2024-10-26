import { BatchDeleteProcess } from '@autocrud/skeleton/processes/batch/delete.process';

export abstract class PrismaBatchDeleteProcess implements BatchDeleteProcess {
  abstract initialization();
  abstract before();
  abstract begin();
  abstract process();
  abstract end();
  abstract after();
  abstract result();
}

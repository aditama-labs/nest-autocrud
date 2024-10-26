import { ISkeletonProcess } from '@autocrud/skeleton/interfaces/skeleton-process.interface';

export abstract class BatchDeleteProcess implements ISkeletonProcess {
  abstract initialization();
  abstract before();
  abstract begin();
  abstract process();
  abstract end();
  abstract after();
  abstract result();
}

import { ISkeletonProcess } from '../interfaces/skeleton-process.interface';

export abstract class ReadProcess implements ISkeletonProcess {
  abstract initialization();
  abstract before();
  abstract begin();
  abstract process();
  abstract end();
  abstract after();
  abstract result();
}

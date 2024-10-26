import { ISkeletonProcess } from '../interfaces/skeleton-process.interface';

export abstract class DeleteProcess<T, R> implements ISkeletonProcess<T, R> {
  abstract initialization(): T;
  abstract before(): T;
  abstract begin(): T;
  abstract process(): T;
  abstract end(): T;
  abstract after(): T;
  abstract result(): R;
}

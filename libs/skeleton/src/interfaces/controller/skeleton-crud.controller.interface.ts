import { IPaginationEntity } from '@autocrud/skeleton/entities/pagination.entity';

export interface ISkeletonCRUDController<T> {
  create(): Promise<T>;
  readSelected(id): Promise<T>;
  readPagination(): Promise<IPaginationEntity<T>>;
  readEntire(): Promise<T[]>;
  updatePartial(): Promise<T>;
  updatePartialBatch(): Promise<T[]>;
  updateEntire(): Promise<T>;
  updateEntireBatch(): Promise<T[]>;
  deleteSelected(): Promise<T>;
  deleteBatch(): Promise<T[]>;
}

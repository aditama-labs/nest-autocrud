import { IPaginationParam } from '../pagination-param.interface';

export interface ISkeletonPaginationController {
  pagination(params: IPaginationParam, res: any);
}

export interface ISkeletonListController {
  list();
}

export interface ISkeletonReadController {
  read(identity);
}

export interface ISkeletonDeleteController {
  delete(identity);
}

export interface ISkeletonCreateController {
  create(body);
}

export interface ISkeletonUpdateController {
  update(identity, body);
}

export interface ISkeletonCRUDController
  extends ISkeletonCreateController,
    ISkeletonReadController,
    ISkeletonDeleteController,
    ISkeletonUpdateController,
    ISkeletonListController,
    ISkeletonPaginationController {}

import { IPaginationParam } from '../pagination-param.interface';

export interface ISkeletonPaginationController {
  pagination(params: IPaginationParam);
}

export interface ISkeletonListController {
  list();
}

export interface ISkeletonReadController {
  read(id);
}

export interface ISkeletonDeleteController {
  delete(id);
}

export interface ISkeletonCreateController {
  create(body);
}

export interface ISkeletonUpdateController {
  update(id, body);
}

export interface ISkeletonCRUDController
  extends ISkeletonCreateController,
    ISkeletonReadController,
    ISkeletonDeleteController,
    ISkeletonUpdateController,
    ISkeletonListController,
    ISkeletonPaginationController {}

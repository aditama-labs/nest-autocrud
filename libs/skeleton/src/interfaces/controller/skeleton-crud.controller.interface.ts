import { IPaginationParam } from '../pagination-param.interface';

export interface ISkeletonReadController {
  list();
  read(id);
  pagination(params: IPaginationParam);
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
    ISkeletonUpdateController {}

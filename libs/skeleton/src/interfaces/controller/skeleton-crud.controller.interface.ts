import { IPaginationParam } from '../pagination-param.interface';

export interface ISkeletonCRUDController {
  create(body);
  delete(id);
  list();
  pagination(params: IPaginationParam);
  read(id);
  update(id, body);
}

export interface ISkeletonCRUDController {
  create(body);
  delete(id);
  list();
  pagination(params: { page?: number; limit?: number });
  read(id);
  update(id, body);
}

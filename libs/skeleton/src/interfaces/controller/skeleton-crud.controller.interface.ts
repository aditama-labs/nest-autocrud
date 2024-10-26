
export interface ISkeletonCRUDController {
  create();
  readSelected(id);
  readPagination();
  readEntire();
  updatePartial();
  updatePartialBatch();
  updateEntire();
  updateEntireBatch();
  deleteSelected();
  deleteBatch();
}

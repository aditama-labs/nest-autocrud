export interface ISkeletonCRUDController {
  create();
  readSelected(id);
  readPagination();
  readEntire();
  updatePartial();
  updatePartialBatch();
  updateEntire();
  updateEntirePatch();
  deleteSelected();
  deleteBatch();
}

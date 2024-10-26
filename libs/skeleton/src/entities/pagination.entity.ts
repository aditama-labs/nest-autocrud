export interface IPaginationEntity<T> {
  // Data related
  data: T[];
  totalData: number;

  // Page related
  totalPage: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  nextPage: number | null;
  previousPage: number | null;
}

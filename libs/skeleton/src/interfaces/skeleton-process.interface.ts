export interface ISkeletonProcess<T, R> {
  initialization(): T;
  before(): T;
  begin(): T;
  process(): T;
  end(): T;
  after(): T;

  result(): R;
}

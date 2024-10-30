export interface ISkeletonProcess {
  initialization();
  before();
  begin();
  process();
  end();
  after();

  output();
}

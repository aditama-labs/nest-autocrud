import { ISkeletonProcess } from '../interfaces/skeleton-process.interface';

export class DefaultProcess implements ISkeletonProcess {
  protected result;

  // @TODO: Soon it will conver to abstract, for now I just set as regular class for simplicity and making developer optionally override it instead of force it
  async initialization() {}
  async before() {}
  async begin() {}
  async process() {}
  async end() {}
  async after() {}

  output() {
    return this.result;
  }
}

import { ISkeletonProcess } from '../interfaces/skeleton-process.interface';

export class DefaultProcess implements ISkeletonProcess {
  protected result;

  async initialization(): Promise<any> {}
  async before(): Promise<any> {}
  async begin(): Promise<any> {}
  async process(): Promise<any> {}
  async end(): Promise<any> {}
  async after(): Promise<any> {}

  output() {
    return this.result;
  }
}

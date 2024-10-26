import { ISkeletonProcess } from '../interfaces/skeleton-process.interface';

export class UpdateProcess implements ISkeletonProcess {
  async initialization(): Promise<any> {}
  async before(): Promise<any> {}
  async begin(): Promise<any> {}
  async process(): Promise<any> {}
  async end(): Promise<any> {}
  async after(): Promise<any> {}
  async result(): Promise<any> {}
}

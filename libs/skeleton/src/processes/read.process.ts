import { ISkeletonProcess } from '../interfaces/skeleton-process.interface';

export abstract class ReadProcess implements ISkeletonProcess {
  async initialization(): Promise<any> {}
  async before(): Promise<any> {}
  async begin(): Promise<any> {}
  async process(): Promise<any> {}
  async end(): Promise<any> {}
  async after(): Promise<any> {}
  async result(): Promise<any> {}
}

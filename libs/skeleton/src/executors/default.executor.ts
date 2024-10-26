import { ISkeletonProcess } from '../interfaces/skeleton-process.interface';

export class DefaultExecutor {
  constructor(private process: ISkeletonProcess) {}

  async execute(): Promise<void> {
    this.process.initialization();
    this.process.before();
    this.process.begin();
    this.process.process();
    this.process.end();
    this.process.after();
  }

  getResult(): any {
    return this.process.result();
  }

  static async bootstrap(process: ISkeletonProcess): Promise<any> {
    const executor = new DefaultExecutor(process);
    await executor.execute();
    return executor.getResult();
  }
}

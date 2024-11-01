import { ISkeletonProcess } from '../interfaces/skeleton-process.interface';

export class DefaultExecutor {
  constructor(private process: ISkeletonProcess) {}

  async execute(): Promise<void> {
    await this.process.initialization();
    await this.process.before();
    await this.process.begin();
    await this.process.process();
    await this.process.end();
    await this.process.after();
  }

  getOutput() {
    return this.process.output();
  }
}

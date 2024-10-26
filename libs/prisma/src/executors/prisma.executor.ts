import { ISkeletonProcess } from '@autocrud/skeleton/interfaces/skeleton-process.interface';

export class PrismaExecutor {
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
}

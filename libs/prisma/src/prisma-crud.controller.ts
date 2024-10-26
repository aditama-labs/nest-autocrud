import { SkeletonCRUDController } from '@autocrud/skeleton';
import { PrismaExecutor } from './executors/prisma.executor';

export class PrismaCRUDController extends SkeletonCRUDController {
  async create(): Promise<any> {
    const executor = new PrismaExecutor(this.createProcess);
    await executor.execute();
    return executor.getResult();
  }
}

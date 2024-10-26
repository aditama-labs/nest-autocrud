import { SkeletonCRUDController } from '@autocrud/skeleton';
import { PrismaExecutor } from './executors/prisma.executor';

export class PrismaCRUDController extends SkeletonCRUDController {
  async create(): Promise<any> {
    return await PrismaExecutor.default(this.createProcess);
  }
}

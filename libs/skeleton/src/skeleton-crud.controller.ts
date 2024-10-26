import { Get, Inject } from '@nestjs/common';
import { READ_ENTIRE_PROCESS } from './constants';
import { DefaultExecutor } from './executors/default.executor';
import { ISkeletonCRUDController } from './interfaces/controller/skeleton-crud.controller.interface';

export class SkeletonCRUDController implements ISkeletonCRUDController {
  constructor(
    @Inject(READ_ENTIRE_PROCESS)
    public readonly readEntireProcess: any,
  ) {}

  @Get('list')
  async readEntire() {
    return await DefaultExecutor.bootstrap(this.readEntireProcess);
  }
}

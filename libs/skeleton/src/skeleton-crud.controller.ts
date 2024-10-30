import { Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import {
  CREATE_PROCESS,
  DELETE_PROCESS,
  LIST_PROCESS,
  PAGINATION_PROCESS,
  READ_PROCESS,
  UPDATE_PROCESS,
} from './constants';
import { DefaultExecutor } from './executors/default.executor';
import { ISkeletonCRUDController } from './interfaces/controller/skeleton-crud.controller.interface';

export class SkeletonCRUDController implements ISkeletonCRUDController {
  constructor(
    @Inject(CREATE_PROCESS)
    public readonly createProcess,
    @Inject(DELETE_PROCESS)
    public readonly deleteProcess,
    @Inject(LIST_PROCESS)
    public readonly listProcess,
    @Inject(PAGINATION_PROCESS)
    public readonly paginationProcess,
    @Inject(READ_PROCESS)
    public readonly readProcess,
    @Inject(UPDATE_PROCESS)
    public readonly updateProcess,
  ) {}

  @Post()
  async create(): Promise<any> {
    return await DefaultExecutor.bootstrap(this.createProcess);
  }

  @Delete(':id')
  async delete() {
    return await DefaultExecutor.bootstrap(this.deleteProcess);
  }

  @Get('list')
  async list() {
    return await DefaultExecutor.bootstrap(this.listProcess);
  }

  @Get()
  async pagination() {
    return await DefaultExecutor.bootstrap(this.paginationProcess);
  }

  @Get(':id')
  async read(@Param('id') id) {
    return await DefaultExecutor.bootstrap(this.readProcess);
  }

  @Patch()
  async update() {
    return await DefaultExecutor.bootstrap(this.updateProcess);
  }
}

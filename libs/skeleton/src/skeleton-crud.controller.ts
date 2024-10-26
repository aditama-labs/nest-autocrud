import { Delete, Get, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import {
  CREATE_PROCESS,
  DELETE_BATCH_PROCESS,
  DELETE_PROCESS,
  READ_ENTIRE_PROCESS,
  READ_PAGINATION_PROCESS,
  READ_PROCESS,
  UPDATE_BATCH_PROCESS,
  UPDATE_ENTIRE_BATCH_PROCESS,
  UPDATE_ENTIRE_PROCESS,
  UPDATE_PARTIAL_PROCESS,
} from './constants';
import { DefaultExecutor } from './executors/default.executor';
import { ISkeletonCRUDController } from './interfaces/controller/skeleton-crud.controller.interface';

export class SkeletonCRUDController implements ISkeletonCRUDController {
  constructor(
    @Inject(CREATE_PROCESS)
    public readonly createProcess,
    @Inject(READ_PROCESS)
    public readonly readProcess,
    @Inject(READ_PAGINATION_PROCESS)
    public readonly readPaginationProcess,
    @Inject(READ_ENTIRE_PROCESS)
    public readonly readEntireProcess,
    @Inject(UPDATE_PARTIAL_PROCESS)
    public readonly updatePartialProcess,
    @Inject(UPDATE_BATCH_PROCESS)
    public readonly updateBatchProcess,
    @Inject(UPDATE_ENTIRE_PROCESS)
    public readonly updateEntireProcess,
    @Inject(UPDATE_ENTIRE_BATCH_PROCESS)
    public readonly updateEntireBatchProcess,
    @Inject(DELETE_PROCESS)
    public readonly deleteProcess,
    @Inject(DELETE_BATCH_PROCESS)
    public readonly deleteBatchProcess,
  ) {}

  @Post()
  async create(): Promise<any> {
    return await DefaultExecutor.bootstrap(this.createProcess);
  }

  @Get(':id')
  async readSelected(@Param('id') id) {
    return await DefaultExecutor.bootstrap(this.readProcess);
  }

  @Get()
  async readPagination() {
    return await DefaultExecutor.bootstrap(this.readPaginationProcess);
  }

  @Get('list')
  async readEntire() {
    return await DefaultExecutor.bootstrap(this.readEntireProcess);
  }

  @Patch()
  async updatePartial() {
    return await DefaultExecutor.bootstrap(this.updatePartialProcess);
  }

  @Patch('batch')
  async updatePartialBatch() {
    return await DefaultExecutor.bootstrap(this.updateBatchProcess);
  }

  @Put()
  async updateEntire() {
    return await DefaultExecutor.bootstrap(this.updateEntireProcess);
  }

  @Put('batch')
  async updateEntireBatch() {
    return await DefaultExecutor.bootstrap(this.updateEntireBatchProcess);
  }

  @Delete()
  async deleteSelected() {
    return await DefaultExecutor.bootstrap(this.deleteProcess);
  }

  @Delete('batch')
  async deleteBatch() {
    return await DefaultExecutor.bootstrap(this.deleteBatchProcess);
  }
}

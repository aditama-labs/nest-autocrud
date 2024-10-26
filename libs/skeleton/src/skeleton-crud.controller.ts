import { Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { DefaultExecutor } from './executors/default.executor';
import { ISkeletonCRUDController } from './interfaces/controller/skeleton-crud.controller.interface';

export class SkeletonCRUDController implements ISkeletonCRUDController {
  constructor(
    public readonly createProcess,
    public readonly readProcess,
    public readonly readPaginationProcess,
    public readonly readEntireProcess,
    public readonly updatePartialProcess,
    public readonly updateBatchProcess,
    public readonly updateEntireProcess,
    public readonly updateEntireBatchProcess,
    public readonly deleteProcess,
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

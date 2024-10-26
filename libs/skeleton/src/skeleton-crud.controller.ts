import { Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
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
  async create() {
    return this.createProcess.result();
  }

  @Get(':id')
  async readSelected(@Param('id') id) {
    return this.readProcess.result();
  }

  @Get()
  async readPagination() {
    return this.readPaginationProcess.result();
  }

  @Get('list')
  async readEntire() {
    return this.readEntireProcess.result();
  }

  @Patch()
  async updatePartial() {
    return this.updatePartialProcess.result();
  }

  @Patch('batch')
  async updatePartialBatch() {
    return this.updateBatchProcess.result();
  }

  @Put()
  async updateEntire() {
    return this.updateEntireProcess.result();
  }

  @Put('batch')
  async updateEntireBatch() {
    return this.updateEntireBatchProcess.result();
  }

  @Delete()
  async deleteSelected() {
    return this.deleteProcess.result();
  }

  @Delete('batch')
  async deleteBatch() {
    return this.deleteBatchProcess.result();
  }
}

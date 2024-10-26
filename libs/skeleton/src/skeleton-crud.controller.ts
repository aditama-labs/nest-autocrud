import { Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ISkeletonCRUDController } from './interfaces/controller/skeleton-crud.controller.interface';

export class SkeletonCRUDController implements ISkeletonCRUDController {
  constructor(
    private readonly createProcess,
    private readonly readProcess,
    private readonly readPaginationProcess,
    private readonly readEntireProcess,
    private readonly updatePartialProcess,
    private readonly updateBatchProcess,
    private readonly updateEntireProcess,
    private readonly updateEntireBatchProcess,
    private readonly deleteProcess,
    private readonly deleteBatchProcess,
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

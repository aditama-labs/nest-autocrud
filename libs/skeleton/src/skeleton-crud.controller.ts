import { Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ISkeletonCRUDController } from './interfaces/controller/skeleton-crud.controller.interface';
import { IPaginationEntity } from './entities/pagination.entity';

export class SkeletonCRUDController<T> implements ISkeletonCRUDController<T> {
  @Post()
  async create(): Promise<T> {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async readSelected(@Param('id') id): Promise<T> {
    throw new Error('Method not implemented.');
  }

  @Get()
  async readPagination(): Promise<IPaginationEntity<T>> {
    throw new Error('Method not implemented.');
  }

  @Get('list')
  async readEntire(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  @Patch()
  async updatePartial(): Promise<T> {
    throw new Error('Method not implemented.');
  }

  @Patch('batch')
  async updatePartialBatch(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  @Put()
  async updateEntire(): Promise<T> {
    throw new Error('Method not implemented.');
  }

  @Put('batch')
  async updateEntireBatch(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  @Delete()
  async deleteSelected(): Promise<T> {
    throw new Error('Method not implemented.');
  }

  @Delete('batch')
  async deleteBatch(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
}

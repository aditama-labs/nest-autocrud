import { Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { IPaginationEntity } from './entities/pagination.entity';
import { ISkeletonCRUDController } from './interfaces/controller/skeleton-crud.controller.interface';
import { BatchDeleteProcess } from './processes/batch/delete.process';
import { BatchUpdateProcess } from './processes/batch/update.process';
import { CreateProcess } from './processes/create.process';
import { DeleteProcess } from './processes/delete.process';
import { ListProcess } from './processes/list.process';
import { PaginationProcess } from './processes/pagination.process';
import { PartialBatchUpdateProcess } from './processes/partial/batch/update.process';
import { ReadProcess } from './processes/read.process';
import { UpdateProcess } from './processes/update.process';

export class SkeletonCRUDController<
  T,
  E,
  CP extends CreateProcess<T, T>,
  RSP extends ReadProcess<T, T>,
  RPP extends PaginationProcess<T, IPaginationEntity<T>>,
  REP extends ListProcess<T, T[]>,
  UPP extends UpdateProcess<T, T>,
  UBP extends PartialBatchUpdateProcess<T, T[]>,
  UEP extends UpdateProcess<T, T>,
  UEBP extends BatchUpdateProcess<T, T[]>,
  DP extends DeleteProcess<T, T>,
  DBP extends BatchDeleteProcess<T, T[]>,
> implements ISkeletonCRUDController<T, E>
{
  constructor(
    private readonly createProcess: CP,
    private readonly readProcess: RSP,
    private readonly readPaginationProcess: RPP,
    private readonly readEntireProcess: REP,
    private readonly updatePartialProcess: UPP,
    private readonly updateBatchProcess: UBP,
    private readonly updateEntireProcess: UEP,
    private readonly updateEntireBatchProcess: UEBP,
    private readonly deleteProcess: DP,
    private readonly deleteBatchProcess: DBP,
  ) {}

  @Post()
  async create(): Promise<T> {
    return this.createProcess.result();
  }

  @Get(':id')
  async readSelected(@Param('id') id: E): Promise<T> {
    return this.readProcess.result();
  }

  @Get()
  async readPagination(): Promise<IPaginationEntity<T>> {
    return this.readPaginationProcess.result();
  }

  @Get('list')
  async readEntire(): Promise<T[]> {
    return this.readEntireProcess.result();
  }

  @Patch()
  async updatePartial(): Promise<T> {
    return this.updatePartialProcess.result();
  }

  @Patch('batch')
  async updatePartialBatch(): Promise<T[]> {
    return this.updateBatchProcess.result();
  }

  @Put()
  async updateEntire(): Promise<T> {
    return this.updateEntireProcess.result();
  }

  @Put('batch')
  async updateEntireBatch(): Promise<T[]> {
    return this.updateEntireBatchProcess.result();
  }

  @Delete()
  async deleteSelected(): Promise<T> {
    return this.deleteProcess.result();
  }

  @Delete('batch')
  async deleteBatch(): Promise<T[]> {
    return this.deleteBatchProcess.result();
  }
}

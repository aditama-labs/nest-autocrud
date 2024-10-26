import { Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ISkeletonCRUDController } from './interfaces/controller/skeleton-crud.controller.interface';

export class SkeletonCRUDController implements ISkeletonCRUDController {
  @Post()
  create() {}

  @Get(':id')
  readSelected(@Param('id') id) {}

  @Get()
  readPagination() {}

  @Get('list')
  readEntire() {}

  @Patch()
  updatePartial() {}

  @Patch('batch')
  updatePartialBatch() {}

  @Put()
  updateEntire() {}

  @Put('batch')
  updateEntirePatch() {}

  @Delete()
  deleteSelected() {}

  @Delete('batch')
  deleteBatch() {}
}

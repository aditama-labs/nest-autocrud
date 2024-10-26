import { Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

export class SkeletonCRUDController {
  @Post()
  create() {}

  @Get(':id')
  readSelected(@Param('id') id: string) {}

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

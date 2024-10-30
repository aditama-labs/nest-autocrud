import {
  Body,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
  async create(@Body() body): Promise<any> {
    return await DefaultExecutor.bootstrap(this.createProcess);
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await DefaultExecutor.bootstrap(this.deleteProcess);
  }

  @Get('list')
  async list() {
    return await DefaultExecutor.bootstrap(this.listProcess);
  }

  @Get()
  async pagination(
    @Query() params: { page?: number; limit?: number } = { page: 1, limit: 10 },
  ) {
    return await DefaultExecutor.bootstrap(this.paginationProcess);
  }

  @Get(':id')
  async read(@Param('id') id) {
    return await DefaultExecutor.bootstrap(this.readProcess);
  }

  @Patch()
  async update(@Param('id') id, @Body() body) {
    return await DefaultExecutor.bootstrap(this.updateProcess);
  }
}

import {
  Body,
  ClassSerializerInterceptor,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CREATE_PROCESS,
  DELETE_PROCESS,
  LIST_PROCESS,
  PAGINATION_PROCESS,
  READ_PROCESS,
  UPDATE_PROCESS,
} from './constants';
import { PaginationParamDTO } from './dto';
import { PaginationExecutor } from './executors';
import { CreateExcutor } from './executors/create.executor';
import { DeleteExecutor } from './executors/delete.executor';
import { ListExecutor } from './executors/list.executor';
import { ReadExecutor } from './executors/read.executor';
import { UpdateExecutor } from './executors/update.executor';
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
    return await CreateExcutor.bootstrap(this.createProcess, body);
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await DeleteExecutor.bootstrap(this.deleteProcess, id);
  }

  @Get('list')
  async list() {
    return await ListExecutor.bootstrap(this.listProcess);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async pagination(@Query() params: PaginationParamDTO) {
    return await PaginationExecutor.bootstrap(this.paginationProcess, params);
  }

  @Get(':id')
  async read(@Param('id') id) {
    return await ReadExecutor.bootstrap(this.readProcess, id);
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() body) {
    return await UpdateExecutor.bootstrap(this.updateProcess, id, body);
  }
}

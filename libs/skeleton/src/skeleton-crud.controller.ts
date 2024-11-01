import {
  Body,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
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
import { ControllerOption } from './interfaces/controller/controller.option';
import { ISkeletonCRUDController } from './interfaces/controller/skeleton-crud.controller.interface';

class SkeletonCRUDController implements ISkeletonCRUDController {
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
  async delete(@Param('id') identity) {
    return await DeleteExecutor.bootstrap(this.deleteProcess, identity);
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
  async read(@Param('id') identity) {
    return await ReadExecutor.bootstrap(this.readProcess, identity);
  }

  @Patch(':id')
  async update(@Param('id') identity, @Body() body) {
    return await UpdateExecutor.bootstrap(this.updateProcess, identity, body);
  }
}

// NOTES:
// - This method only works when return as `any`
// - I know this is not recommended but.... is there any way to pass custom unique identifier ?
// - Everyone still can use SkeletonCRUDController with no issue if don't want or don't like this approach, but... unique identifier must ID for sure and the type should either UUID, String or Number
// - Correct me if I wrong. I already read the main repository of NestJS and they use Reflect for passing some metadata ( I know how to do it ) but... it still not possible for dynamic unique identifier
// Known issue:
// - OpenAPI ( Swagger ) cannot read any decorator inside this
export const AutoCRUDController = (options?: ControllerOption): any => {
  const uniqueIdentifier = `${options?.uniqueIdentifier ?? 'id'}`;

  class CRUDController extends SkeletonCRUDController {
    @Post()
    async create(@Body() body): Promise<any> {
      return await super.create(body);
    }

    @Delete(`:${uniqueIdentifier}`)
    async delete(@Param(uniqueIdentifier) id) {
      return await super.delete(id);
    }

    @Get('list')
    async list() {
      return await super.list();
    }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    async pagination(@Query() params: PaginationParamDTO) {
      return await super.pagination(params);
    }

    @Get(`:${uniqueIdentifier}`)
    async read(@Param(uniqueIdentifier) id) {
      return await super.read(id);
    }

    @Patch(`:${uniqueIdentifier}`)
    async update(@Param(uniqueIdentifier) id, @Body() body) {
      return await super.update(id, body);
    }
  }

  return CRUDController;
};

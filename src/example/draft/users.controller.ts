import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateExcutor } from '../../../libs/skeleton/src/executors/create.executor';
import { UpdateExecutor } from '../../../libs/skeleton/src/executors/update.executor';
import { UserCreateProcess } from './user-create.process';
import { UserUpdateProcess } from './user-update.process';
import { DraftService } from '../../../libs/skeleton/src/draft';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userCreateProcess: UserCreateProcess,
    private readonly userUpdateProcess: UserUpdateProcess,
  ) {}

  @Post()
  async createUser(@Body() userData: any, @Query('draft') draft: boolean) {
    // Set draft mode based on query parameter
    this.userCreateProcess.setDraftMode(draft === true);
    
    // Use the executor to run the process
    return await CreateExcutor.bootstrap(this.userCreateProcess, userData);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: any,
    @Query('draft') draft: boolean,
  ) {
    // Set draft mode based on query parameter
    this.userUpdateProcess.setDraftMode(draft === true);
    
    // Use the executor to run the process
    return await UpdateExecutor.bootstrap(
      this.userUpdateProcess,
      id,
      userData,
    );
  }

  @Get('drafts/:entityId')
  async getUserDrafts(@Param('entityId') entityId: string) {
    const draftService = DraftService.getInstance();
    return await draftService.getDrafts(entityId);
  }

  @Get('drafts/:entityId/:timestamp')
  async getUserDraft(
    @Param('entityId') entityId: string,
    @Param('timestamp') timestamp: string,
  ) {
    const draftService = DraftService.getInstance();
    return await draftService.getDraft(entityId, parseInt(timestamp, 10));
  }
}

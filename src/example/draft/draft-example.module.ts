import { Module } from '@nestjs/common';
import { UserCreateProcess } from './user-create.process';
import { UserUpdateProcess } from './user-update.process';
import { UsersController } from './users.controller';
import { DraftModule, DraftDriverType } from '../../../libs/skeleton/src/draft';
import * as path from 'path';

@Module({
  imports: [
    DraftModule.register({
      driver: DraftDriverType.DISK,
      diskOptions: {
        basePath: path.join(process.cwd(), 'drafts'),
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UserCreateProcess, UserUpdateProcess],
})
export class DraftExampleModule {}

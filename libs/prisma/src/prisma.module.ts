import {
  CREATE_PROCESS,
  READ_ENTIRE_PROCESS,
  READ_PAGINATION_PROCESS,
  READ_PROCESS,
  UPDATE_BATCH_PROCESS,
  UPDATE_ENTIRE_BATCH_PROCESS,
  UPDATE_ENTIRE_PROCESS,
  UPDATE_PARTIAL_PROCESS,
} from '@autocrud/skeleton';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaBatchUpdateProcess } from './processes/batch/update.process';
import { PrismaCreateProcess } from './processes/create.process';
import { PrismaListProcess } from './processes/list.process';
import { PrismaPaginationProcess } from './processes/pagination.process';
import { PrismaPartialUpdateProcess } from './processes/partial/update.process';
import { PrismaReadProcess } from './processes/read.process';
import { PrismaUpdateProcess } from './processes/update.process';

@Module({
  providers: [
    PrismaService,
    { provide: CREATE_PROCESS, useClass: PrismaCreateProcess },
    { provide: READ_PROCESS, useClass: PrismaReadProcess },
    { provide: READ_PAGINATION_PROCESS, useClass: PrismaPaginationProcess },
    { provide: READ_ENTIRE_PROCESS, useClass: PrismaListProcess },
    { provide: UPDATE_PARTIAL_PROCESS, useClass: PrismaPartialUpdateProcess },
    { provide: UPDATE_BATCH_PROCESS, useClass: PrismaPartialUpdateProcess },
    { provide: UPDATE_ENTIRE_PROCESS, useClass: PrismaUpdateProcess },
    {
      provide: UPDATE_ENTIRE_BATCH_PROCESS,
      useClass: PrismaBatchUpdateProcess,
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}

import { READ_ENTIRE_PROCESS } from '@autocrud/skeleton';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaListProcess } from './processes/list.process';

@Module({
  providers: [
    PrismaService,
    { provide: READ_ENTIRE_PROCESS, useClass: PrismaListProcess },
    ,
  ],
  exports: [PrismaService],
})
export class PrismaModule {}

import { READ_ENTIRE_PROCESS } from '@autocrud/skeleton';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaListProcess } from './processes/list.process';

export const configServiceProvider = {
  provide: READ_ENTIRE_PROCESS,
  useClass: PrismaListProcess,
};

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

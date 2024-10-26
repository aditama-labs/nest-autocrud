import { PrismaModule, PrismaService } from '@autocrud/prisma';
import { PRISMA_DELEGATE } from '@autocrud/prisma/constants';
import { ListProcess } from '@autocrud/skeleton/processes/list.process';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { READ_ENTIRE_PROCESS } from '@autocrud/skeleton';
import { PrismaListProcess } from '@autocrud/prisma/processes/list.process';

const customFactory = {
  provide: PRISMA_DELEGATE,
  useFactory: (prisma: PrismaService) => {
    return prisma.user;
  },
  inject: [PrismaService],
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    customFactory,
    { provide: READ_ENTIRE_PROCESS, useClass: PrismaListProcess },
  ],
})
export class AppModule {}

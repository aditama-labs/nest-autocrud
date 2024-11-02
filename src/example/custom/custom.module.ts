import { PrismaModule } from '@aditama-labs/nest-autocrud/prisma';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CustomController } from './custom.controller';
import { CustomListProcess } from './domain/custom.list.process';
import { CustomReadProcess } from './domain/custom.read.process';

@Module({
  imports: [
    PrismaModule.forRoot({
      delegate: (prisma: PrismaClient) => prisma.user,
      processList: CustomListProcess,
      processRead: CustomReadProcess,
    }),
  ],
  controllers: [CustomController],
  providers: [],
})
export class CustomModule {}

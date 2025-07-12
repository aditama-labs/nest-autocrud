import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_DELEGATE, PrismaService } from 'libs';
import { PrismaAuthBasicController } from './basic.controller';
import { PrismaBasicAuthProcess } from './domain/auth.process';

@Module({
  controllers: [PrismaAuthBasicController],
  providers: [
    PrismaService,
    {
      provide: PRISMA_DELEGATE,
      useFactory: (prisma: PrismaClient) => prisma.user,
      inject: [PrismaService],
    },
    PrismaBasicAuthProcess,
  ],
})
export class PrismaAuthBasicModule {}

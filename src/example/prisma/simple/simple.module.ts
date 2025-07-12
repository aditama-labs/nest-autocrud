import { PrismaModule } from '@aditama-labs/nest-autocrud/prisma';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaSimpleController } from './simple.controller';

@Module({
  imports: [
    PrismaModule.forRoot({
      delegate: (prisma: PrismaClient) => prisma.user,
    }),
  ],
  controllers: [PrismaSimpleController],
  providers: [],
})
export class PrismaSimpleModule {}

import { PrismaModule } from '@aditama-labs/nest-autocrud/prisma';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SimpleController } from './simple.controller';

@Module({
  imports: [
    PrismaModule.forRoot({
      delegate: (prisma: PrismaClient) => prisma.user,
    }),
  ],
  controllers: [SimpleController],
  providers: [],
})
export class SimpleModule {}

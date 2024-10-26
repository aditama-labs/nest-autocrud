import {
  configServiceProvider,
  PrismaModule,
  PrismaService,
} from '@autocrud/prisma';
import { PRISMA_DELEGATE } from '@autocrud/prisma/constants';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const customFactory = {
  provide: PRISMA_DELEGATE,
  useFactory: (prisma: PrismaService) => {
    return prisma.user;
  },
  inject: [PrismaService],
};

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService, customFactory, configServiceProvider],
})
export class AppModule {}

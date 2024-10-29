import { PrismaModule } from '@aditama-labs/nest-autocrud/prisma';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppListProcess } from './processes/list.process';

@Module({
  imports: [
    PrismaModule.forRoot({
      delegate: (prisma) => prisma.user,
      processList: AppListProcess,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

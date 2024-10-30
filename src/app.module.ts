import { PrismaModule } from '@aditama-labs/nest-autocrud/prisma';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule.forRoot({
      delegate: (prisma) => prisma.user,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { CustomModule } from './example/prisma/custom/custom.module';
import { SimpleModule } from './example/prisma/simple/simple.module';

@Module({
  imports: [
    SimpleModule,
    CustomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

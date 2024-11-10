import { Module } from '@nestjs/common';
import { CustomModule } from './example/prisma/custom/custom.module';
import { SimpleModule } from './example/prisma/simple/simple.module';
import { SimpleTypeORMModule } from './example/typeorm/simple.module';

@Module({
  imports: [SimpleTypeORMModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SimpleModule } from './example/simple/simple.module';
import { CustomModule } from './example/custom/custom.module';

@Module({
  imports: [SimpleModule, CustomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

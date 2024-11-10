import { Module } from '@nestjs/common';
import { PrismaCustomModule } from './example/prisma/custom/custom.module';
import { PrismaSimpleModule } from './example/prisma/simple/simple.module';
import { TypeORMSimpleModule } from './example/typeorm/simple/simple.module';
import { TypeORMCustomModule } from './example/typeorm/custom/custom.module';

@Module({
  imports: [
    PrismaCustomModule,
    PrismaSimpleModule,
    TypeORMSimpleModule,
    TypeORMCustomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaAuthBasicModule } from './example/prisma/auth/basic/basic.module';
import { PrismaCustomModule } from './example/prisma/custom/custom.module';
import { PrismaSimpleModule } from './example/prisma/simple/simple.module';
import { TypeORMCustomModule } from './example/typeorm/custom/custom.module';
import { TypeORMSimpleModule } from './example/typeorm/simple/simple.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaCustomModule,
    PrismaSimpleModule,
    TypeORMSimpleModule,
    TypeORMCustomModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '60s' },
    }),
    PrismaAuthBasicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

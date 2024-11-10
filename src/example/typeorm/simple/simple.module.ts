import { TypeORMModule } from '@aditama-labs/nest-autocrud/typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { TypeORMSimpleController } from './simple.controller';

@Module({
  imports: [
    TypeORMModule.forRoot<UserEntity>({
      entity: UserEntity,
    }),
  ],
  controllers: [TypeORMSimpleController],
  providers: [],
})
export class TypeORMSimpleModule {}

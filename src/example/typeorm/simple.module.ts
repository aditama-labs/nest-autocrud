import { TypeORMModule } from '@aditama-labs/nest-autocrud/typeorm';
import { Module } from '@nestjs/common';
import { SimpleTypeORMController } from './simple.controller';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeORMModule.forRoot<UserEntity>({
      entity: UserEntity,
    }),
  ],
  controllers: [SimpleTypeORMController],
  providers: [],
})
export class SimpleTypeORMModule {}

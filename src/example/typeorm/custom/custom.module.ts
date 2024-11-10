import { TypeORMModule } from '@aditama-labs/nest-autocrud/typeorm';
import { Module } from '@nestjs/common';
import { TypeORMCustomController } from './custom.controller';
import { UserEntity } from './entities/user.entity';
import { CustomListProcess } from './domain/custom.list.process';
import { CustomReadProcess } from './domain/custom.read.process';

@Module({
  imports: [
    TypeORMModule.forRoot<UserEntity>({
      entity: UserEntity,
      processRead: CustomReadProcess,
      processList: CustomListProcess,
    }),
  ],
  controllers: [TypeORMCustomController],
  providers: [],
})
export class TypeORMCustomModule {}

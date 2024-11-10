import { TypeORMReadProcess } from '@aditama-labs/nest-autocrud/typeorm/processes';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class CustomReadProcess extends TypeORMReadProcess<UserEntity> {
  customResult;

  async before(): Promise<any> {
    console.log('The ID requested in path parameter', this.identityData);
  }

  async after(): Promise<any> {
    this.customResult = {
      ...super.output(),
      custom_code: 'XXXX',
    };
  }

  output() {
    return this.customResult;
  }
}

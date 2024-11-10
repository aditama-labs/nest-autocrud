import { TypeORMListProcess } from '@aditama-labs/nest-autocrud/typeorm/processes';
import { UserEntity } from '../entities/user.entity';

export class CustomListProcess extends TypeORMListProcess<UserEntity> {
  async before(): Promise<any> {
    console.log('This is custom logic before query to database');
  }

  output() {
    console.log('You can modify the output here');
    return super.output();
  }
}

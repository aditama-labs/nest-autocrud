import { ListProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { TypeORMProcess } from './typeorm.process';

export class TypeORMListProcess<T>
  extends TypeORMProcess<T>
  implements ListProcess
{
  async process() {
    this.result = await this.service.getRepository().find();
  }
}

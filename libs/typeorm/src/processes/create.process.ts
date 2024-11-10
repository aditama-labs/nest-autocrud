import { CreateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { TypeORMProcess } from './typeorm.process';

export class TypeORMCreateProcess<T>
  extends TypeORMProcess<T>
  implements CreateProcess
{
  public payload;

  async process() {
    this.result = await this.service.getRepository().save(this.payload);
  }
}

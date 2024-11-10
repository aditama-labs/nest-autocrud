import { UpdateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { TypeORMProcess } from './typeorm.process';

export class TypeORMUpdateProcess<T>
  extends TypeORMProcess<T>
  implements UpdateProcess
{
  public identityData;
  public identityKey: string = 'id';
  public payload;

  async process() {
    this.result = await this.service.getRepository().update(
      <any>{
        [this.identityKey]: this.identityData,
      },
      this.payload,
    );
  }
}

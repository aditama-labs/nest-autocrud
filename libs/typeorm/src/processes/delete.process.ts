import { DeleteProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { TypeORMProcess } from './typeorm.process';

export class TypeORMDeleteProcess<T>
  extends TypeORMProcess<T>
  implements DeleteProcess
{
  public identityData;
  public identityKey: string = 'id';

  async process() {
    this.result = await this.service.getRepository().delete(<any>{
      [this.identityKey]: this.identityData,
    });
  }
}

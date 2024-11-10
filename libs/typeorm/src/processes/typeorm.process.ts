import { DefaultProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { Injectable } from '@nestjs/common';
import { TypeORMService } from '../typeorm.service';

@Injectable()
export class TypeORMProcess<T> extends DefaultProcess {
  constructor(public service: TypeORMService<T>) {
    super();
  }
}

import { DefaultProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { Inject, Injectable } from '@nestjs/common';
import { TypeORMService } from '../typeorm.service';
import { TYPEORM_WHERE_CLAUSE } from '../constants';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class TypeORMProcess<T> extends DefaultProcess {
  constructor(
    public service: TypeORMService<T>,
    @Inject(TYPEORM_WHERE_CLAUSE)
    public uniqueWhereClause: FindOptionsWhere<T>,
  ) {
    super();
  }
}

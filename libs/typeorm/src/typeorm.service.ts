import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TYPEORM_REPOSITORY } from './constants';

@Injectable()
export class TypeormService<T> {
  constructor(
    @Inject(TYPEORM_REPOSITORY)
    private repository: Repository<T>,
  ) {}
}

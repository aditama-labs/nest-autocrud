import { EntityTarget, ObjectLiteral } from 'typeorm';

export interface TypeORMModuleOptions<T extends ObjectLiteral> {
  entity: EntityTarget<T>;
  processCreate?;
  processDelete?;
  processList?;
  processPagination?;
  processRead?;
  processUpdate?;
  synchronize?: boolean;
  entities?: any[];
}

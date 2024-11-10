import { EntityTarget, FindOptionsWhere, ObjectLiteral } from "typeorm";

export interface TypeORMModuleOptions<T extends ObjectLiteral> {
  entity: EntityTarget<T>;
  synchronize?: boolean;
  entities: string[];
  uniqueWhereClause: FindOptionsWhere<T>;
}

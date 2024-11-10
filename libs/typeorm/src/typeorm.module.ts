import { DynamicModule, Module } from '@nestjs/common';
import { DataSource, ObjectLiteral } from 'typeorm';
import {
  TYPEORM_DATASOURCE,
  TYPEORM_REPOSITORY,
  TYPEORM_WHERE_CLAUSE,
} from './constants';
import { TypeORMModuleOptions } from './interfaces';
import { TypeORMService } from './typeorm.service';

const getDatabaseCredential = (
  synchronize?: boolean,
  entities?: string[],
): any => {
  const url = new URL(process.env.DATABASE_URL);

  let entityList = [__dirname + '/../**/*.entity{.ts,.js}'];
  if (entities) {
    entityList = entities;
  }

  let protocol;
  switch (url.protocol) {
    case 'postgresql':
      protocol = 'postgres';
      break;
    case 'mysql':
      protocol = 'mysql';
      break;
  }

  // Extract the necessary components
  const username = url.username;
  const password = url.password;
  const host = url.hostname;
  const port = url.port;
  const databaseName = url.pathname.substring(1); // Remove the leading slash
  return {
    type: protocol,
    host: host,
    port: port,
    username: username,
    password: password,
    database: databaseName,
    entities: entityList,
    synchronize: synchronize ?? false,
  };
};

@Module({})
export class TypeORMModule {
  static forRoot<T extends ObjectLiteral>(
    options: TypeORMModuleOptions<T>,
  ): DynamicModule {
    let providers = [
      TypeORMService,
      {
        provide: TYPEORM_DATASOURCE,
        useFactory: async () => {
          const dataSource = new DataSource(
            getDatabaseCredential(options.synchronize, options.entities),
          );
          return dataSource.initialize();
        },
      },
      {
        provide: TYPEORM_REPOSITORY,
        useFactory: (dataSource: DataSource) =>
          dataSource.getRepository(options.entity),
        inject: [TYPEORM_DATASOURCE],
      },
    ];

    return {
      module: TypeORMModule,
      providers: [
        ...providers,
        {
          provide: TYPEORM_WHERE_CLAUSE,
          useValue: options.uniqueWhereClause,
        },
      ],
      exports: providers,
    };
  }
}

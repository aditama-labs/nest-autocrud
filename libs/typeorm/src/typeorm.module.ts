import {
  CREATE_PROCESS,
  DELETE_PROCESS,
  LIST_PROCESS,
  PAGINATION_PROCESS,
  READ_PROCESS,
  UPDATE_PROCESS,
} from '@aditama-labs/nest-autocrud/skeleton';
import { DynamicModule, Module } from '@nestjs/common';
import { DataSource, ObjectLiteral } from 'typeorm';
import { TYPEORM_DATASOURCE, TYPEORM_REPOSITORY } from './constants';
import { TypeORMModuleOptions } from './interfaces';
import {
  TypeORMCreateProcess,
  TypeORMDeleteProcess,
  TypeORMListProcess,
  TypeORMPaginationProcess,
  TypeORMReadProcess,
  TypeORMUpdateProcess,
} from './processes';
import { TypeORMService } from './typeorm.service';

const getDatabaseCredential = (
  synchronize?: boolean,
  entities?: string[],
): any => {
  const url = new URL(process.env.DATABASE_URL);

  const defaultProtocol = url.protocol.substring(0, url.protocol.length - 1);
  let protocol = defaultProtocol;
  switch (defaultProtocol) {
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
    entities,
    synchronize: synchronize ?? false,
  };
};

@Module({})
export class TypeORMModule {
  private static autoPresetProvider(providers, option, key, preset) {
    if (option) {
      providers = [
        ...providers,
        {
          provide: key,
          useClass: option,
        },
      ];
    } else {
      providers = [
        ...providers,
        {
          provide: key,
          useClass: preset,
        },
      ];
    }
    return providers;
  }

  static forRoot<T extends ObjectLiteral>(
    options: TypeORMModuleOptions<T>,
  ): DynamicModule {
    let providers = [
      TypeORMService,
      {
        provide: TYPEORM_DATASOURCE,
        useFactory: async () => {
          const dataSource = new DataSource(
            getDatabaseCredential(options.synchronize, [
              options.entity,
              ...(options.entities ?? []),
            ]),
          );
          return dataSource.initialize();
        },
      },
      {
        provide: TYPEORM_REPOSITORY,
        useFactory: (dataSource: DataSource) => {
          return dataSource.getRepository(options.entity);
        },
        inject: [TYPEORM_DATASOURCE],
      },
    ];

    providers = TypeORMModule.autoPresetProvider(
      providers,
      options.processCreate,
      CREATE_PROCESS,
      TypeORMCreateProcess,
    );

    providers = TypeORMModule.autoPresetProvider(
      providers,
      options.processDelete,
      DELETE_PROCESS,
      TypeORMDeleteProcess,
    );

    providers = TypeORMModule.autoPresetProvider(
      providers,
      options.processList,
      LIST_PROCESS,
      TypeORMListProcess,
    );

    providers = TypeORMModule.autoPresetProvider(
      providers,
      options.processPagination,
      PAGINATION_PROCESS,
      TypeORMPaginationProcess,
    );

    providers = TypeORMModule.autoPresetProvider(
      providers,
      options.processRead,
      READ_PROCESS,
      TypeORMReadProcess,
    );

    providers = TypeORMModule.autoPresetProvider(
      providers,
      options.processUpdate,
      UPDATE_PROCESS,
      TypeORMUpdateProcess,
    );

    return {
      module: TypeORMModule,
      providers: [...providers],
      exports: [
        TYPEORM_DATASOURCE,
        TYPEORM_REPOSITORY,
        // List of Process
        CREATE_PROCESS,
        DELETE_PROCESS,
        LIST_PROCESS,
        PAGINATION_PROCESS,
        READ_PROCESS,
        UPDATE_PROCESS,
      ],
    };
  }
}

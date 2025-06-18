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
import { Credential } from '@aditama-labs/nest-autocrud/utils';

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
            new Credential(process.env.DATABASE_URL).toTypeOrmConfig(options.synchronize, [
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

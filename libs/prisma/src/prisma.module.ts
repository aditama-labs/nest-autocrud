import {
  CREATE_PROCESS,
  DELETE_PROCESS,
  LIST_PROCESS,
  PAGINATION_PROCESS,
  READ_PROCESS,
  UPDATE_PROCESS,
} from '@aditama-labs/nest-autocrud/skeleton';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './config.module-definition';
import { PRISMA_DELEGATE } from './constants';
import { PrismaModuleOptions } from './interfaces/config-module-options.interface';
import { PrismaService } from './prisma.service';
import {
  PrismaCreateProcess,
  PrismaDeleteProcess,
  PrismaPaginationProcess,
  PrismaReadProcess,
  PrismaUpdateProcess,
} from './processes';
import { PrismaListProcess } from './processes/list.process';

@Module({
  exports: [
    PrismaService,
    PRISMA_DELEGATE,
    // List of Process
    CREATE_PROCESS,
    DELETE_PROCESS,
    LIST_PROCESS,
    PAGINATION_PROCESS,
    READ_PROCESS,
    UPDATE_PROCESS,
  ],
})
export class PrismaModule extends ConfigurableModuleClass {
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

  static forRoot(options: PrismaModuleOptions): DynamicModule {
    let providers = [];
    providers = [
      ...providers,
      PrismaService,
      {
        provide: PRISMA_DELEGATE,
        useFactory: options.delegate,
        inject: [PrismaService],
      },
    ];

    providers = PrismaModule.autoPresetProvider(
      providers,
      options.processCreate,
      CREATE_PROCESS,
      PrismaCreateProcess,
    );

    providers = PrismaModule.autoPresetProvider(
      providers,
      options.processDelete,
      DELETE_PROCESS,
      PrismaDeleteProcess,
    );

    providers = PrismaModule.autoPresetProvider(
      providers,
      options.processList,
      LIST_PROCESS,
      PrismaListProcess,
    );

    providers = PrismaModule.autoPresetProvider(
      providers,
      options.processPagination,
      PAGINATION_PROCESS,
      PrismaPaginationProcess,
    );

    providers = PrismaModule.autoPresetProvider(
      providers,
      options.processRead,
      READ_PROCESS,
      PrismaReadProcess,
    );

    providers = PrismaModule.autoPresetProvider(
      providers,
      options.processUpdate,
      UPDATE_PROCESS,
      PrismaUpdateProcess,
    );

    return {
      ...super.forRoot(options),
      providers,
    };
  }
}

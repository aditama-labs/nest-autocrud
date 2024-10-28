import { READ_ENTIRE_PROCESS } from '@autocrud/skeleton';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './config.module-definition';
import { PRISMA_DELEGATE } from './constants';
import { PrismaModuleOptions } from './interfaces/config-module-options.interface';
import { PrismaService } from './prisma.service';
import { PrismaListProcess } from './processes/list.process';

@Module({
  exports: [PrismaService, PRISMA_DELEGATE, READ_ENTIRE_PROCESS],
})
export class PrismaModule extends ConfigurableModuleClass {
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
    if (options.processList) {
      providers = [
        ...providers,
        {
          provide: READ_ENTIRE_PROCESS,
          useClass: options.processList,
        },
      ];
    } else {
      providers = [
        ...providers,
        {
          provide: READ_ENTIRE_PROCESS,
          useClass: PrismaListProcess,
        },
      ];
    }
    return {
      ...super.forRoot(options),
      providers,
    };
  }
}

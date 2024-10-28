import { ConfigurableModuleBuilder } from '@nestjs/common';
import { PrismaModuleOptions } from './interfaces/config-module-options.interface';

export const { ConfigurableModuleClass } =
  new ConfigurableModuleBuilder<PrismaModuleOptions>()
    .setClassMethodName('forRoot')
    .build();

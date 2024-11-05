import { ConfigurableModuleBuilder } from '@nestjs/common';
import { TypeORMModuleOptions } from './interfaces';

export const { ConfigurableModuleClass } =
  new ConfigurableModuleBuilder<TypeORMModuleOptions>()
    .setClassMethodName('forRoot')
    .build();

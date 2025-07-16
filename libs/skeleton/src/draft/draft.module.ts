import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { DraftService, DraftOptions } from './draft.service';

@Global()
@Module({})
export class DraftModule {
  /**
   * Register the draft module with options
   * @param options - Configuration options for the draft module
   */
  static register(options: DraftOptions): DynamicModule {
    const draftServiceProvider: Provider = {
      provide: DraftService,
      useFactory: () => {
        const draftService = DraftService.getInstance();
        draftService.initialize(options);
        return draftService;
      },
    };

    return {
      module: DraftModule,
      providers: [draftServiceProvider],
      exports: [draftServiceProvider],
    };
  }
}

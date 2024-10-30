import { DefaultExecutor } from '.';
import { PaginationProcess } from '../processes';

export class PaginationExecutor extends DefaultExecutor {
  constructor(
    process: PaginationProcess,
    params: { page: number; limit: number },
  ) {
    super(process);
    // Set params to process
    process.params = params;
  }

  static async bootstrap(
    process: PaginationProcess,
    params: { page: number; limit: number },
  ): Promise<any> {
    const executor = new PaginationExecutor(process, params);
    await executor.execute();
    return executor.getOutput();
  }
}

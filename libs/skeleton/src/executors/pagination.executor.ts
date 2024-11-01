import { DefaultExecutor } from '.';
import { PaginationParamDTO } from '../dto';
import { PaginationProcess } from '../processes';

export class PaginationExecutor extends DefaultExecutor {
  constructor(process: PaginationProcess, params: PaginationParamDTO) {
    super(process);
    // Set params to process
    process.params = params;
  }

  static async bootstrap(
    process: PaginationProcess,
    params: PaginationParamDTO,
  ): Promise<any> {
    const executor = new PaginationExecutor(process, params);
    await executor.execute();
    return executor.getOutput();
  }
}

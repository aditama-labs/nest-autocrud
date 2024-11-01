import { DeleteProcess } from '../processes';
import { DefaultExecutor } from './default.executor';

// @TODO: ReadExecutor and DeleteExecutor can be merged into one executor
export class DeleteExecutor extends DefaultExecutor {
  constructor(process: DeleteProcess, id) {
    super(process);
    // Set the id of the data
    process.identity = id;
  }

  static async bootstrap(process: DeleteProcess, id): Promise<any> {
    const executor = new DeleteExecutor(process, id);
    await executor.execute();
    return executor.getOutput();
  }
}

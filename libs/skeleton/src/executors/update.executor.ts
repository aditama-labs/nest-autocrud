import { UpdateProcess } from '../processes';
import { DefaultExecutor } from './default.executor';

// @TODO: This executor should be able to extend from ReadExecutor and CreateExecutor
export class UpdateExecutor extends DefaultExecutor {
  constructor(process: UpdateProcess, id, data) {
    super(process);
    // Set the id and data to process
    process.identity = id;
    process.payload = data;
  }

  static async bootstrap(process: UpdateProcess, id, data): Promise<any> {
    const executor = new UpdateExecutor(process, id, data);
    await executor.execute();
    return executor.getOutput();
  }
}

import { ReadProcess } from '../processes';
import { DefaultExecutor } from './default.executor';

export class ReadExecutor extends DefaultExecutor {
  constructor(process: ReadProcess, id) {
    super(process);
    // Set the id of the data
    process.identity = id;
  }

  static async bootstrap(process: ReadProcess, id) {
    const executor = new ReadExecutor(process, id);
    await executor.execute();
    return executor.getOutput();
  }
}

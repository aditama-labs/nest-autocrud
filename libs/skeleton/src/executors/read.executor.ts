import { ReadProcess } from '../processes';
import { DefaultExecutor } from './default.executor';

export class ReadExecutor extends DefaultExecutor {
  constructor(process: ReadProcess, id) {
    super(process);
    // Set the id of the data
    process.id = id;
  }

  static async bootstrap(process: ReadProcess, id): Promise<any> {
    const executor = new ReadExecutor(process, id);
    await executor.execute();
    return executor.getOutput();
  }
}

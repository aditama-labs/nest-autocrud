import { DefaultExecutor } from '.';
import { ListProcess } from '../processes';

export class ListExecutor extends DefaultExecutor {
  constructor(process: ListProcess) {
    super(process);
  }

  static async bootstrap(process: ListProcess): Promise<any> {
    const executor = new ListExecutor(process);
    await executor.execute();
    return executor.getOutput();
  }
}

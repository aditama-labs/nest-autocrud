import { ReadProcess } from '../processes';
import { DefaultExecutor } from './default.executor';

export class ReadExecutor extends DefaultExecutor {
  constructor(process: ReadProcess, identityData, identityKey: string = 'id') {
    super(process);
    // Set the id of the data
    process.identityData = identityData;
    process.identityKey = identityKey;
  }

  static async bootstrap(
    process: ReadProcess,
    identityData,
    identityKey: string = 'id',
  ) {
    const executor = new ReadExecutor(process, identityData, identityKey);
    await executor.execute();
    return executor.getOutput();
  }
}

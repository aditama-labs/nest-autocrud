import { UpdateProcess } from '../processes';
import { DefaultExecutor } from './default.executor';

// @TODO: This executor should be able to extend from ReadExecutor and CreateExecutor
export class UpdateExecutor extends DefaultExecutor {
  constructor(
    process: UpdateProcess,
    identityData,
    data,
    identityKey: string = 'id',
  ) {
    super(process);
    // Set the id and data to process
    process.identityData = identityData;
    process.payload = data;
    process.identityKey = identityKey;
  }

  static async bootstrap(
    process: UpdateProcess,
    identityData,
    data,
    identityKey: string = 'id',
  ) {
    const executor = new UpdateExecutor(
      process,
      identityData,
      data,
      identityKey,
    );
    await executor.execute();
    return executor.getOutput();
  }
}

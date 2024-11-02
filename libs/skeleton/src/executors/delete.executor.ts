import { DeleteProcess } from '../processes';
import { DefaultExecutor } from './default.executor';

// @TODO: ReadExecutor and DeleteExecutor can be merged into one executor
export class DeleteExecutor extends DefaultExecutor {
  constructor(
    process: DeleteProcess,
    identityData,
    identityKey: string = 'id',
  ) {
    super(process);
    // Set the id of the data
    process.identityData = identityData;
    process.identityKey = identityKey;
  }

  static async bootstrap(
    process: DeleteProcess,
    identityData,
    identityKey: string = 'id',
  ) {
    const executor = new DeleteExecutor(process, identityData, identityKey);
    await executor.execute();
    return executor.getOutput();
  }
}

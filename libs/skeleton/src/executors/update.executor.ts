import { UpdateProcess } from '../processes';
import { DefaultExecutor } from './default.executor';
import { DraftDriver } from '../interfaces/draft-driver.interface';

export class UpdateExecutor extends DefaultExecutor {
  constructor(
    process: UpdateProcess,
    identityData,
    data,
    identityKey: string = 'id',
    isDraft: boolean = false,
    draftDriver: DraftDriver,
  ) {
    super(process);
    // Set the id and data to process
    process.identityData = identityData;
    process.payload = data;
    process.identityKey = identityKey;
    process.isDraft = isDraft;
    process.draftDriver = draftDriver;
  }

  static async bootstrap(
    process: UpdateProcess,
    identityData,
    data,
    identityKey: string = 'id',
    isDraft: boolean = false,
    draftDriver: DraftDriver,
  ) {
    const executor = new UpdateExecutor(
      process,
      identityData,
      data,
      identityKey,
      isDraft,
      draftDriver,
    );
    await executor.execute();
    return executor.getOutput();
  }
}

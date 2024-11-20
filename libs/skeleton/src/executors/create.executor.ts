import { CreateProcess } from '../processes';
import { DefaultExecutor } from './default.executor';
import { DraftDriver } from '../interfaces/draft-driver.interface';

export class CreateExcutor extends DefaultExecutor {
  constructor(process: CreateProcess, data, isDraft: boolean = false, draftDriver: DraftDriver) {
    super(process);
    process.payload = data;
    process.isDraft = isDraft;
    process.draftDriver = draftDriver;
  }

  static async bootstrap(process: CreateProcess, data, isDraft: boolean = false, draftDriver: DraftDriver) {
    const executor = new CreateExcutor(process, data, isDraft, draftDriver);
    await executor.execute();
    return executor.getOutput();
  }
}

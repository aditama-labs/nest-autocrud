import { CreateProcess } from '../processes';
import { DefaultExecutor } from './default.executor';

export class CreateExcutor extends DefaultExecutor {
  constructor(process: CreateProcess, data) {
    super(process);
    // Set data to process
    process.data = data;
  }

  static async bootstrap(process: CreateProcess, data): Promise<any> {
    const executor = new CreateExcutor(process, data);
    await executor.execute();
    return executor.getOutput();
  }
}

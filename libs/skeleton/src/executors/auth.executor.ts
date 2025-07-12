import { AuthProcess } from '../processes/auth.process';
import { DefaultExecutor } from './default.executor';

export class AuthExecutor extends DefaultExecutor {
  constructor(process: AuthProcess, data) {
    super(process);
    // Set data to process
    process.payload = data;
  }

  static async bootstrap(process: AuthProcess, data) {
    const executor = new AuthExecutor(process, data);
    await executor.execute();
    return executor.getOutput();
  }
}

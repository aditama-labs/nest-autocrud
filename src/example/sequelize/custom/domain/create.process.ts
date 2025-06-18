import { CreateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { SequelizeProcess } from './sequelize.process';

export class SequelizeCreateProcess
  extends SequelizeProcess
  implements CreateProcess {
  public payload;

  async process() {
    this.result = await this.userModel.create(this.payload);
    if (!this.result) {
      throw new Error('Failed to create user');
    }
  }
}

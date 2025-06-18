import { DeleteProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { SequelizeProcess } from './sequelize.process';

export class SequelizeDeleteProcess
  extends SequelizeProcess
  implements DeleteProcess {
  public identityData;
  public identityKey: string = 'id';

  async process() {
    const user = await this.userModel.findOne(this.identityData);
    this.result = user;
    await user.destroy();
  }
}

import { UpdateProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { SequelizeProcess } from './sequelize.process';

export class SequelizeUpdateProcess
  extends SequelizeProcess
  implements UpdateProcess {
  public identityData;
  public identityKey: string = 'id';
  public payload;

  async process() {
    const user = await this.userModel.findOne({
      where: {
        [this.identityKey]: this.identityData[this.identityKey],
      },
    });
    this.result = user;
    if (user) {
      await user.update(this.payload);
    }
    else {
      throw new Error(`User with ${this.identityKey} ${this.identityData[this.identityKey]} not found`);
    }
  }
}

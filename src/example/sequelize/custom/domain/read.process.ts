import { ReadProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { SequelizeProcess } from './sequelize.process';

export class PrismaReadProcess extends SequelizeProcess implements ReadProcess {
  public identityData;
  public identityKey: string = 'id';

  async process() {
    this.result = await this.userModel.findOne({
      where: {
        [this.identityKey]: this.identityData[this.identityKey],
      },
    });
  }
}

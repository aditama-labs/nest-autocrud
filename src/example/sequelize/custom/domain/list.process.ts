import { ListProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { SequelizeProcess } from './sequelize.process';

export class SequelizeListProcess extends SequelizeProcess implements ListProcess {
  async process() {
    this.result = await this.userModel.findAll({});
  }
}

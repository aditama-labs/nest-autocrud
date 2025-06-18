import { DefaultProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';


@Injectable()
export class SequelizeProcess extends DefaultProcess {
  constructor(
    protected sequelize: Sequelize,
    @InjectModel(User)
    protected userModel: typeof User
  ) {
    super();
  }
}

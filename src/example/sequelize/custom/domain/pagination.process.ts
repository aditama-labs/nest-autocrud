import { PaginationProcess } from '@aditama-labs/nest-autocrud/skeleton';
import { SequelizeProcess } from './sequelize.process';
import { IPaginationParam } from '@aditama-labs/nest-autocrud/skeleton/src/interfaces/pagination-param.interface';

export class SequelizePaginationProcess
  extends SequelizeProcess
  implements PaginationProcess {
  params: IPaginationParam;

  async process() {
    const { page, limit } = this.params;
    const skip = (page - 1) * limit;

    const { count, rows } = await this.userModel.findAndCountAll({
      offset: skip,
      limit: limit,
    });
    this.result = {
      data: rows,
      meta: {
        totalItems: count,
        itemCount: rows.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
    };
  }
}

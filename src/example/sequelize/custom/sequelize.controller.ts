import { SkeletonCRUDController } from '@aditama-labs/nest-autocrud/skeleton';
import { Controller } from '@nestjs/common';

@Controller('example/sequelize/custom')
export class SequelizeSimpleController extends SkeletonCRUDController { }

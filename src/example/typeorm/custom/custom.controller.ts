import { SkeletonCRUDController } from '@aditama-labs/nest-autocrud/skeleton';
import { Controller } from '@nestjs/common';

@Controller('example/typeorm/custom')
export class TypeORMCustomController extends SkeletonCRUDController {}

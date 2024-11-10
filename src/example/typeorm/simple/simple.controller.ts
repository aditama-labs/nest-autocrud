import { SkeletonCRUDController } from '@aditama-labs/nest-autocrud/skeleton';
import { Controller } from '@nestjs/common';

@Controller('example/typeorm/simple')
export class TypeORMSimpleController extends SkeletonCRUDController {}

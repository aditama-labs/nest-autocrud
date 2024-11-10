import { SkeletonCRUDController } from '@aditama-labs/nest-autocrud/skeleton';
import { Controller } from '@nestjs/common';

@Controller('example/simple/typeorm')
export class SimpleTypeORMController extends SkeletonCRUDController {}

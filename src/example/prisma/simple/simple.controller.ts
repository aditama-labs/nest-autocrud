import { SkeletonCRUDController } from '@aditama-labs/nest-autocrud/skeleton';
import { Controller } from '@nestjs/common';

@Controller('example/simple')
export class SimpleController extends SkeletonCRUDController {}

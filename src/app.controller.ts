import { SkeletonCRUDController } from '@autocrud/skeleton';
import { Controller } from '@nestjs/common';

@Controller('hello')
export class AppController extends SkeletonCRUDController {}

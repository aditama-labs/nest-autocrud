import { Controller } from '@nestjs/common';
import { SkeletonController, SkeletonCRUDController } from 'libs';

@Controller('example/simple')
@SkeletonController()
export class SimpleController extends SkeletonCRUDController {}

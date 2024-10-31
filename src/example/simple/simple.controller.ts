import { Controller } from '@nestjs/common';
import { SkeletonCRUDController } from 'libs';

@Controller('example/simple')
export class SimpleController extends SkeletonCRUDController {}

import { Controller } from '@nestjs/common';
import { SkeletonCRUDController } from 'libs';

@Controller('example/custom')
export class CustomController extends SkeletonCRUDController {}

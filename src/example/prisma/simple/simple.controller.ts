import { SkeletonCRUDController } from '@aditama-labs/nest-autocrud/skeleton';
import { Controller } from '@nestjs/common';

@Controller('example/prisma/simple')
export class PrismaSimpleController extends SkeletonCRUDController {}

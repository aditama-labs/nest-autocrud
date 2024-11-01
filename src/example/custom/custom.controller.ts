import { getBaseController } from '@aditama-labs/nest-autocrud/skeleton';
import { Controller } from '@nestjs/common';

@Controller('example/custom')
export class CustomController extends getBaseController({
  uniqueIdentifier: 'key',
}) {}

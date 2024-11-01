import { Controller } from '@nestjs/common';
import { AutoCRUDController } from 'libs';

@Controller('example/simple')
export class SimpleController extends AutoCRUDController({
  uniqueIdentifier: 'username',
}) {}

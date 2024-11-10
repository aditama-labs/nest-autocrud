import { CustomCRUDController } from '@aditama-labs/nest-autocrud/skeleton';
import { Controller, Get } from '@nestjs/common';

@Controller('example/custom')
export class CustomController extends CustomCRUDController({
  uniqueIdentifier: 'username',
}) {
  @Get('list')
  async list(): Promise<any> {
    console.log('Hello World');
    return await super.list();
  }
}

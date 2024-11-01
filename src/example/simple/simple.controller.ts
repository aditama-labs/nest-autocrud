import { UniqueOverride } from '@aditama-labs/nest-autocrud/skeleton/src/decoratos/unique-override.decorator';
import { Controller, Get } from '@nestjs/common';
import { getBaseController, SkeletonController, UNIQUE_IDENTIFIER } from 'libs';

@SkeletonController()
@Controller('example/simple')
export class SimpleController extends getBaseController() {
  @UniqueOverride()
  @Get('list')
  async list(): Promise<any> {
    console.log(Reflect.getOwnMetadata(UNIQUE_IDENTIFIER, this.constructor));
    return super.list();
  }
}

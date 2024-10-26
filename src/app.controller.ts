import { PrismaCRUDController } from '@autocrud/prisma/prisma-crud.controller';
import { Controller } from '@nestjs/common';

@Controller('hello')
export class AppController extends PrismaCRUDController {
  constructor() {}

  // Read(): void {
  //   console.log(this.appService.getHello());
  // }
}

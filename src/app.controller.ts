import { AutoCRUDController } from '@autocrud/autocrud';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('hello')
export class AppController extends AutoCRUDController {
  constructor(private readonly appService: AppService) {
    super();
  }

  // Read(): void {
  //   console.log(this.appService.getHello());
  // }
}

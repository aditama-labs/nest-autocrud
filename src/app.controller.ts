import { SkeletonCRUDController } from '@autocrud/skeleton';
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('hello')
export class AppController extends SkeletonCRUDController {
  constructor(private readonly appService: AppService) {
    super();
  }

  // Read(): void {
  //   console.log(this.appService.getHello());
  // }
}

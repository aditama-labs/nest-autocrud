import {
  PrismaReadProcess
} from '@aditama-labs/nest-autocrud/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomReadProcess extends PrismaReadProcess {
  customResult;

  async before(): Promise<any> {
    console.log(await this.prisma.user.findMany());
    console.log('The ID requested in path parameter', this.identityData);
  }
  
  async after(): Promise<any> {
    this.customResult = {
      ...super.output(),
      custom_code: 'XXXX',
    };
  }

  output() {
    return this.customResult;
  }
}

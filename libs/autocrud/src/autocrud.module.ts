import { Module } from '@nestjs/common';
import { AutocrudService as AutoCRUDService } from './autocrud.service';
import { AutoCRUDController } from './autocrud.controller';

@Module({
  providers: [AutoCRUDService],
  exports: [AutoCRUDService],
  controllers: [AutoCRUDController],
})
export class AutoCRUDModule {}

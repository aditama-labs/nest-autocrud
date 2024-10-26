import { Test, TestingModule } from '@nestjs/testing';
import { AutocrudService } from './autocrud.service';

describe('AutocrudService', () => {
  let service: AutocrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutocrudService],
    }).compile();

    service = module.get<AutocrudService>(AutocrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

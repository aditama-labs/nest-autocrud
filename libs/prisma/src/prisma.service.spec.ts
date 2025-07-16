import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
    
    // Mock the $connect method to prevent actual connection attempts during tests
    jest.spyOn(service, '$connect').mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should connect to the database on module initialization', async () => {
      // When
      await service.onModuleInit();

      // Then
      expect(service.$connect).toHaveBeenCalledTimes(1);
    });
  });

  describe('inheritance', () => {
    it('should have PrismaClient methods', () => {
      // Test that it has PrismaClient properties
      expect(service.$connect).toBeDefined();
      expect(typeof service.$connect).toBe('function');
    });
  });
});

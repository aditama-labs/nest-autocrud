import { PaginationExecutor } from './pagination.executor';
import { PaginationProcess } from '../processes';
import { PaginationParamDTO } from '../dto';

// Create a mock for the PaginationProcess
jest.mock('../processes/pagination.process', () => {
  return {
    PaginationProcess: jest.fn().mockImplementation(() => ({
      initialization: jest.fn().mockResolvedValue(undefined),
      before: jest.fn().mockResolvedValue(undefined),
      begin: jest.fn().mockResolvedValue(undefined),
      process: jest.fn().mockResolvedValue(undefined),
      end: jest.fn().mockResolvedValue(undefined),
      after: jest.fn().mockResolvedValue(undefined),
      output: jest.fn().mockReturnValue({
        data: [
          { id: '1', name: 'Entity 1' },
          { id: '2', name: 'Entity 2' },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 2,
          totalPages: 1
        }
      }),
      params: undefined,
      total: 0
    }))
  };
});

describe('PaginationExecutor', () => {
  let mockProcess;
  const paginationParams = new PaginationParamDTO();
  paginationParams.page = 1;
  paginationParams.limit = 10;

  beforeEach(() => {
    // Create a new instance of PaginationProcess mock for each test
    mockProcess = new PaginationProcess();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should set the pagination parameters on the process', () => {
      // When
      new PaginationExecutor(mockProcess, paginationParams);

      // Then
      expect(mockProcess.params).toEqual(paginationParams);
    });
  });

  describe('bootstrap', () => {
    it('should create an instance, execute it, and return the output', async () => {
      // When
      const result = await PaginationExecutor.bootstrap(mockProcess, paginationParams);

      // Then
      expect(mockProcess.initialization).toHaveBeenCalledTimes(1);
      expect(mockProcess.before).toHaveBeenCalledTimes(1);
      expect(mockProcess.begin).toHaveBeenCalledTimes(1);
      expect(mockProcess.process).toHaveBeenCalledTimes(1);
      expect(mockProcess.end).toHaveBeenCalledTimes(1);
      expect(mockProcess.after).toHaveBeenCalledTimes(1);
      expect(mockProcess.output).toHaveBeenCalledTimes(1);
      expect(mockProcess.params).toEqual(paginationParams);
      expect(result).toEqual({
        data: [
          { id: '1', name: 'Entity 1' },
          { id: '2', name: 'Entity 2' },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 2,
          totalPages: 1
        }
      });
    });
  });
});

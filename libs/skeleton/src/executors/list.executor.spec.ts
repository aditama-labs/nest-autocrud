import { ListExecutor } from './list.executor';
import { ListProcess } from '../processes';

// Create a mock for the ListProcess
jest.mock('../processes/list.process', () => {
  return {
    ListProcess: jest.fn().mockImplementation(() => ({
      initialization: jest.fn().mockResolvedValue(undefined),
      before: jest.fn().mockResolvedValue(undefined),
      begin: jest.fn().mockResolvedValue(undefined),
      process: jest.fn().mockResolvedValue(undefined),
      end: jest.fn().mockResolvedValue(undefined),
      after: jest.fn().mockResolvedValue(undefined),
      output: jest.fn().mockReturnValue([
        { id: '1', name: 'Entity 1' },
        { id: '2', name: 'Entity 2' },
      ]),
    }))
  };
});

describe('ListExecutor', () => {
  let mockProcess;

  beforeEach(() => {
    // Create a new instance of ListProcess mock for each test
    mockProcess = new ListProcess();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance with the provided process', () => {
      // When
      const executor = new ListExecutor(mockProcess);

      // Then
      expect(executor).toBeDefined();
      // Check private property using any as a workaround
      expect((executor as any).process).toBe(mockProcess);
    });
  });

  describe('bootstrap', () => {
    it('should create an instance, execute it, and return the output', async () => {
      // When
      const result = await ListExecutor.bootstrap(mockProcess);

      // Then
      expect(mockProcess.initialization).toHaveBeenCalledTimes(1);
      expect(mockProcess.before).toHaveBeenCalledTimes(1);
      expect(mockProcess.begin).toHaveBeenCalledTimes(1);
      expect(mockProcess.process).toHaveBeenCalledTimes(1);
      expect(mockProcess.end).toHaveBeenCalledTimes(1);
      expect(mockProcess.after).toHaveBeenCalledTimes(1);
      expect(mockProcess.output).toHaveBeenCalledTimes(1);
      expect(result).toEqual([
        { id: '1', name: 'Entity 1' },
        { id: '2', name: 'Entity 2' },
      ]);
    });
  });
});

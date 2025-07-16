import { DeleteExecutor } from './delete.executor';
import { DeleteProcess } from '../processes';

// Create a mock for the DeleteProcess
jest.mock('../processes/delete.process', () => {
  return {
    DeleteProcess: jest.fn().mockImplementation(() => ({
      initialization: jest.fn().mockResolvedValue(undefined),
      before: jest.fn().mockResolvedValue(undefined),
      begin: jest.fn().mockResolvedValue(undefined),
      process: jest.fn().mockResolvedValue(undefined),
      end: jest.fn().mockResolvedValue(undefined),
      after: jest.fn().mockResolvedValue(undefined),
      output: jest.fn().mockReturnValue({ success: true }),
      identityData: undefined,
      identityKey: 'id'
    }))
  };
});

describe('DeleteExecutor', () => {
  let mockProcess;
  const testIdentityData = '123';
  const customIdentityKey = 'userId';

  beforeEach(() => {
    // Create a new instance of DeleteProcess mock for each test
    mockProcess = new DeleteProcess();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should set the identityData and use default identityKey', () => {
      // When
      new DeleteExecutor(mockProcess, testIdentityData);

      // Then
      expect(mockProcess.identityData).toEqual(testIdentityData);
      expect(mockProcess.identityKey).toEqual('id'); // default value
    });

    it('should set both identityData and custom identityKey', () => {
      // When
      new DeleteExecutor(mockProcess, testIdentityData, customIdentityKey);

      // Then
      expect(mockProcess.identityData).toEqual(testIdentityData);
      expect(mockProcess.identityKey).toEqual(customIdentityKey);
    });
  });

  describe('bootstrap', () => {
    it('should create an instance, execute it, and return the output with default key', async () => {
      // When
      const result = await DeleteExecutor.bootstrap(mockProcess, testIdentityData);

      // Then
      expect(mockProcess.initialization).toHaveBeenCalledTimes(1);
      expect(mockProcess.before).toHaveBeenCalledTimes(1);
      expect(mockProcess.begin).toHaveBeenCalledTimes(1);
      expect(mockProcess.process).toHaveBeenCalledTimes(1);
      expect(mockProcess.end).toHaveBeenCalledTimes(1);
      expect(mockProcess.after).toHaveBeenCalledTimes(1);
      expect(mockProcess.output).toHaveBeenCalledTimes(1);
      expect(mockProcess.identityData).toEqual(testIdentityData);
      expect(mockProcess.identityKey).toEqual('id');
      expect(result).toEqual({ success: true });
    });

    it('should create an instance, execute it, and return the output with custom key', async () => {
      // When
      const result = await DeleteExecutor.bootstrap(mockProcess, testIdentityData, customIdentityKey);

      // Then
      expect(mockProcess.initialization).toHaveBeenCalledTimes(1);
      expect(mockProcess.before).toHaveBeenCalledTimes(1);
      expect(mockProcess.begin).toHaveBeenCalledTimes(1);
      expect(mockProcess.process).toHaveBeenCalledTimes(1);
      expect(mockProcess.end).toHaveBeenCalledTimes(1);
      expect(mockProcess.after).toHaveBeenCalledTimes(1);
      expect(mockProcess.output).toHaveBeenCalledTimes(1);
      expect(mockProcess.identityData).toEqual(testIdentityData);
      expect(mockProcess.identityKey).toEqual(customIdentityKey);
      expect(result).toEqual({ success: true });
    });
  });
});

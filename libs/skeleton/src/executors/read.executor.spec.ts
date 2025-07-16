import { ReadExecutor } from './read.executor';
import { ReadProcess } from '../processes';

// Create a mock for the ReadProcess
jest.mock('../processes/read.process', () => {
  return {
    ReadProcess: jest.fn().mockImplementation(() => ({
      initialization: jest.fn().mockResolvedValue(undefined),
      before: jest.fn().mockResolvedValue(undefined),
      begin: jest.fn().mockResolvedValue(undefined),
      process: jest.fn().mockResolvedValue(undefined),
      end: jest.fn().mockResolvedValue(undefined),
      after: jest.fn().mockResolvedValue(undefined),
      output: jest.fn().mockReturnValue({ id: '123', name: 'Test Entity' }),
      identityData: undefined,
      identityKey: 'id'
    }))
  };
});

describe('ReadExecutor', () => {
  let mockProcess;
  const testIdentityData = '123';
  const customIdentityKey = 'userId';

  beforeEach(() => {
    // Create a new instance of ReadProcess mock for each test
    mockProcess = new ReadProcess();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should set the identityData and use default identityKey', () => {
      // When
      new ReadExecutor(mockProcess, testIdentityData);

      // Then
      expect(mockProcess.identityData).toEqual(testIdentityData);
      expect(mockProcess.identityKey).toEqual('id'); // default value
    });

    it('should set both identityData and custom identityKey', () => {
      // When
      new ReadExecutor(mockProcess, testIdentityData, customIdentityKey);

      // Then
      expect(mockProcess.identityData).toEqual(testIdentityData);
      expect(mockProcess.identityKey).toEqual(customIdentityKey);
    });
  });

  describe('bootstrap', () => {
    it('should create an instance, execute it, and return the output with default key', async () => {
      // When
      const result = await ReadExecutor.bootstrap(mockProcess, testIdentityData);

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
      expect(result).toEqual({ id: '123', name: 'Test Entity' });
    });

    it('should create an instance, execute it, and return the output with custom key', async () => {
      // When
      const result = await ReadExecutor.bootstrap(mockProcess, testIdentityData, customIdentityKey);

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
      expect(result).toEqual({ id: '123', name: 'Test Entity' });
    });
  });
});

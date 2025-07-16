import { UpdateExecutor } from './update.executor';
import { UpdateProcess } from '../processes';

// Create a mock for the UpdateProcess
jest.mock('../processes/update.process', () => {
  return {
    UpdateProcess: jest.fn().mockImplementation(() => ({
      initialization: jest.fn().mockResolvedValue(undefined),
      before: jest.fn().mockResolvedValue(undefined),
      begin: jest.fn().mockResolvedValue(undefined),
      process: jest.fn().mockResolvedValue(undefined),
      end: jest.fn().mockResolvedValue(undefined),
      after: jest.fn().mockResolvedValue(undefined),
      output: jest.fn().mockReturnValue({ id: '123', name: 'Updated Entity', updated: true }),
      identityData: undefined,
      identityKey: 'id',
      payload: undefined
    }))
  };
});

describe('UpdateExecutor', () => {
  let mockProcess;
  const testIdentityData = '123';
  const testPayload = { name: 'Updated Entity' };
  const customIdentityKey = 'userId';

  beforeEach(() => {
    // Create a new instance of UpdateProcess mock for each test
    mockProcess = new UpdateProcess();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should set the identityData, payload and use default identityKey', () => {
      // When
      new UpdateExecutor(mockProcess, testIdentityData, testPayload);

      // Then
      expect(mockProcess.identityData).toEqual(testIdentityData);
      expect(mockProcess.payload).toEqual(testPayload);
      expect(mockProcess.identityKey).toEqual('id'); // default value
    });

    it('should set identityData, payload and custom identityKey', () => {
      // When
      new UpdateExecutor(mockProcess, testIdentityData, testPayload, customIdentityKey);

      // Then
      expect(mockProcess.identityData).toEqual(testIdentityData);
      expect(mockProcess.payload).toEqual(testPayload);
      expect(mockProcess.identityKey).toEqual(customIdentityKey);
    });
  });

  describe('bootstrap', () => {
    it('should create an instance, execute it, and return the output with default key', async () => {
      // When
      const result = await UpdateExecutor.bootstrap(mockProcess, testIdentityData, testPayload);

      // Then
      expect(mockProcess.initialization).toHaveBeenCalledTimes(1);
      expect(mockProcess.before).toHaveBeenCalledTimes(1);
      expect(mockProcess.begin).toHaveBeenCalledTimes(1);
      expect(mockProcess.process).toHaveBeenCalledTimes(1);
      expect(mockProcess.end).toHaveBeenCalledTimes(1);
      expect(mockProcess.after).toHaveBeenCalledTimes(1);
      expect(mockProcess.output).toHaveBeenCalledTimes(1);
      expect(mockProcess.identityData).toEqual(testIdentityData);
      expect(mockProcess.payload).toEqual(testPayload);
      expect(mockProcess.identityKey).toEqual('id');
      expect(result).toEqual({ id: '123', name: 'Updated Entity', updated: true });
    });

    it('should create an instance, execute it, and return the output with custom key', async () => {
      // When
      const result = await UpdateExecutor.bootstrap(
        mockProcess, 
        testIdentityData, 
        testPayload, 
        customIdentityKey
      );

      // Then
      expect(mockProcess.initialization).toHaveBeenCalledTimes(1);
      expect(mockProcess.before).toHaveBeenCalledTimes(1);
      expect(mockProcess.begin).toHaveBeenCalledTimes(1);
      expect(mockProcess.process).toHaveBeenCalledTimes(1);
      expect(mockProcess.end).toHaveBeenCalledTimes(1);
      expect(mockProcess.after).toHaveBeenCalledTimes(1);
      expect(mockProcess.output).toHaveBeenCalledTimes(1);
      expect(mockProcess.identityData).toEqual(testIdentityData);
      expect(mockProcess.payload).toEqual(testPayload);
      expect(mockProcess.identityKey).toEqual(customIdentityKey);
      expect(result).toEqual({ id: '123', name: 'Updated Entity', updated: true });
    });
  });
});

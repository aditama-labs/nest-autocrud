import { CreateExcutor } from './create.executor';
import { CreateProcess } from '../processes';

// Create a mock for the CreateProcess
jest.mock('../processes/create.process', () => {
  return {
    CreateProcess: jest.fn().mockImplementation(() => ({
      initialization: jest.fn().mockResolvedValue(undefined),
      before: jest.fn().mockResolvedValue(undefined),
      begin: jest.fn().mockResolvedValue(undefined),
      process: jest.fn().mockResolvedValue(undefined),
      end: jest.fn().mockResolvedValue(undefined),
      after: jest.fn().mockResolvedValue(undefined),
      output: jest.fn().mockReturnValue({ data: 'created-data' }),
      payload: undefined
    }))
  };
});

describe('CreateExcutor', () => {
  let mockProcess;
  const testData = { name: 'Test Entity', value: 'test-value' };

  beforeEach(() => {
    // Create a new instance of CreateProcess mock for each test
    mockProcess = new CreateProcess();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should set the payload on the process', () => {
      // When
      new CreateExcutor(mockProcess, testData);

      // Then
      expect(mockProcess.payload).toEqual(testData);
    });
  });

  describe('bootstrap', () => {
    it('should create an instance, execute it, and return the output', async () => {
      // When
      const result = await CreateExcutor.bootstrap(mockProcess, testData);

      // Then
      expect(mockProcess.initialization).toHaveBeenCalledTimes(1);
      expect(mockProcess.before).toHaveBeenCalledTimes(1);
      expect(mockProcess.begin).toHaveBeenCalledTimes(1);
      expect(mockProcess.process).toHaveBeenCalledTimes(1);
      expect(mockProcess.end).toHaveBeenCalledTimes(1);
      expect(mockProcess.after).toHaveBeenCalledTimes(1);
      expect(mockProcess.output).toHaveBeenCalledTimes(1);
      expect(mockProcess.payload).toEqual(testData);
      expect(result).toEqual({ data: 'created-data' });
    });
  });
});

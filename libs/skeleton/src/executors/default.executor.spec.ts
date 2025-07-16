import { DefaultExecutor } from './default.executor';
import { ISkeletonProcess } from '../interfaces/skeleton-process.interface';

// Create a mock process that implements ISkeletonProcess interface
class MockProcess implements ISkeletonProcess {
  initialization = jest.fn().mockResolvedValue(undefined);
  before = jest.fn().mockResolvedValue(undefined);
  begin = jest.fn().mockResolvedValue(undefined);
  process = jest.fn().mockResolvedValue(undefined);
  end = jest.fn().mockResolvedValue(undefined);
  after = jest.fn().mockResolvedValue(undefined);
  output = jest.fn().mockReturnValue({ result: 'test-output' });
}

describe('DefaultExecutor', () => {
  let executor: DefaultExecutor;
  let mockProcess: MockProcess;

  beforeEach(() => {
    mockProcess = new MockProcess();
    executor = new DefaultExecutor(mockProcess);
  });

  describe('execute', () => {
    it('should call all process lifecycle methods in the correct order', async () => {
      // When
      await executor.execute();

      // Then
      expect(mockProcess.initialization).toHaveBeenCalledTimes(1);
      expect(mockProcess.before).toHaveBeenCalledTimes(1);
      expect(mockProcess.begin).toHaveBeenCalledTimes(1);
      expect(mockProcess.process).toHaveBeenCalledTimes(1);
      expect(mockProcess.end).toHaveBeenCalledTimes(1);
      expect(mockProcess.after).toHaveBeenCalledTimes(1);

      // Verify execution order using mockImplementation
      const calls: string[] = [];
      mockProcess.initialization.mockImplementation(() => calls.push('initialization'));
      mockProcess.before.mockImplementation(() => calls.push('before'));
      mockProcess.begin.mockImplementation(() => calls.push('begin'));
      mockProcess.process.mockImplementation(() => calls.push('process'));
      mockProcess.end.mockImplementation(() => calls.push('end'));
      mockProcess.after.mockImplementation(() => calls.push('after'));

      await executor.execute();
      
      expect(calls).toEqual([
        'initialization',
        'before',
        'begin',
        'process',
        'end',
        'after'
      ]);
    });
  });

  describe('getOutput', () => {
    it('should return the output from the process', () => {
      // When
      const output = executor.getOutput();

      // Then
      expect(mockProcess.output).toHaveBeenCalledTimes(1);
      expect(output).toEqual({ result: 'test-output' });
    });
  });
});

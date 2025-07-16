import { ListProcess } from './list.process';

describe('ListProcess', () => {
  let process: ListProcess;

  beforeEach(() => {
    process = new ListProcess();
  });

  describe('inheritance', () => {
    it('should inherit from DefaultProcess', () => {
      // Then - verify that ListProcess has all the methods from DefaultProcess
      expect(typeof process.initialization).toBe('function');
      expect(typeof process.before).toBe('function');
      expect(typeof process.begin).toBe('function');
      expect(typeof process.process).toBe('function');
      expect(typeof process.end).toBe('function');
      expect(typeof process.after).toBe('function');
      expect(typeof process.output).toBe('function');
    });
  });

  describe('output', () => {
    it('should return undefined when no result is set', () => {
      // When
      const output = process.output();

      // Then
      expect(output).toBeUndefined();
    });

    it('should return the result when set', () => {
      // Given
      const testResult = [
        { id: '1', name: 'Entity 1' },
        { id: '2', name: 'Entity 2' },
      ];
      process['result'] = testResult;

      // When
      const output = process.output();

      // Then
      expect(output).toBe(testResult);
    });
  });
});

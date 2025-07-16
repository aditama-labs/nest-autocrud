import { DefaultProcess } from './default.process';

describe('DefaultProcess', () => {
  let process: DefaultProcess;

  beforeEach(() => {
    process = new DefaultProcess();
  });

  describe('lifecycle methods', () => {
    it('should have all required lifecycle methods', () => {
      // Then
      expect(typeof process.initialization).toBe('function');
      expect(typeof process.before).toBe('function');
      expect(typeof process.begin).toBe('function');
      expect(typeof process.process).toBe('function');
      expect(typeof process.end).toBe('function');
      expect(typeof process.after).toBe('function');
      expect(typeof process.output).toBe('function');
    });

    it('should not throw errors when lifecycle methods are called', async () => {
      // Then
      await expect(process.initialization()).resolves.not.toThrow();
      await expect(process.before()).resolves.not.toThrow();
      await expect(process.begin()).resolves.not.toThrow();
      await expect(process.process()).resolves.not.toThrow();
      await expect(process.end()).resolves.not.toThrow();
      await expect(process.after()).resolves.not.toThrow();
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
      const testResult = { data: 'test-data' };
      process['result'] = testResult;

      // When
      const output = process.output();

      // Then
      expect(output).toBe(testResult);
    });
  });
});

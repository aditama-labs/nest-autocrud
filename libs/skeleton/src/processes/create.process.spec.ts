import { CreateProcess } from './create.process';

describe('CreateProcess', () => {
  let process: CreateProcess;

  beforeEach(() => {
    process = new CreateProcess();
  });

  describe('payload', () => {
    it('should be able to set and get payload', () => {
      // Given
      const testPayload = { name: 'Test Entity', value: 'test-value' };
      
      // When
      process.payload = testPayload;

      // Then
      expect(process.payload).toBe(testPayload);
    });
  });

  describe('inheritance', () => {
    it('should inherit from DefaultProcess', () => {
      // Then - verify that CreateProcess has all the methods from DefaultProcess
      expect(typeof process.initialization).toBe('function');
      expect(typeof process.before).toBe('function');
      expect(typeof process.begin).toBe('function');
      expect(typeof process.process).toBe('function');
      expect(typeof process.end).toBe('function');
      expect(typeof process.after).toBe('function');
      expect(typeof process.output).toBe('function');
    });
  });
});

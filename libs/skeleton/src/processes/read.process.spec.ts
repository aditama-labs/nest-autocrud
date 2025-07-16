import { ReadProcess } from './read.process';

describe('ReadProcess', () => {
  let process: ReadProcess;

  beforeEach(() => {
    process = new ReadProcess();
  });

  describe('default values', () => {
    it('should have default identityKey set to "id"', () => {
      // Then
      expect(process.identityKey).toBe('id');
    });

    it('should have undefined identityData by default', () => {
      // Then
      expect(process.identityData).toBeUndefined();
    });
  });

  describe('identityData', () => {
    it('should be able to set and get identityData', () => {
      // Given
      const testIdentityData = '123';
      
      // When
      process.identityData = testIdentityData;

      // Then
      expect(process.identityData).toBe(testIdentityData);
    });
  });

  describe('identityKey', () => {
    it('should be able to set and get identityKey', () => {
      // Given
      const testIdentityKey = 'userId';
      
      // When
      process.identityKey = testIdentityKey;

      // Then
      expect(process.identityKey).toBe(testIdentityKey);
    });
  });

  describe('inheritance', () => {
    it('should inherit from DefaultProcess', () => {
      // Then - verify that ReadProcess has all the methods from DefaultProcess
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

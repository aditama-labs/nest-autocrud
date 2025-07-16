import { UpdateProcess } from './update.process';

describe('UpdateProcess', () => {
  let process: UpdateProcess;

  beforeEach(() => {
    process = new UpdateProcess();
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

    it('should have undefined payload by default', () => {
      // Then
      expect(process.payload).toBeUndefined();
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

  describe('payload', () => {
    it('should be able to set and get payload', () => {
      // Given
      const testPayload = { name: 'Updated Entity' };
      
      // When
      process.payload = testPayload;

      // Then
      expect(process.payload).toBe(testPayload);
    });
  });

  describe('inheritance', () => {
    it('should inherit from DefaultProcess', () => {
      // Then - verify that UpdateProcess has all the methods from DefaultProcess
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

import { PaginationProcess } from './pagination.process';
import { PaginationParamDTO } from '../dto';

describe('PaginationProcess', () => {
  let process: PaginationProcess;

  beforeEach(() => {
    process = new PaginationProcess();
  });

  describe('default values', () => {
    it('should have undefined params by default', () => {
      // Then
      expect(process.params).toBeUndefined();
    });

    it('should have undefined total by default', () => {
      // Then
      expect(process.total).toBeUndefined();
    });
  });

  describe('params', () => {
    it('should be able to set and get params', () => {
      // Given
      const paginationParams = new PaginationParamDTO();
      paginationParams.page = 1;
      paginationParams.limit = 10;
      
      // When
      process.params = paginationParams;

      // Then
      expect(process.params).toBe(paginationParams);
      expect(process.params.page).toBe(1);
      expect(process.params.limit).toBe(10);
    });
  });

  describe('total', () => {
    it('should be able to set and get total', () => {
      // Given
      const testTotal = 100;
      
      // When
      process.total = testTotal;

      // Then
      expect(process.total).toBe(testTotal);
    });
  });

  describe('inheritance', () => {
    it('should inherit from DefaultProcess', () => {
      // Then - verify that PaginationProcess has all the methods from DefaultProcess
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
      const testResult = {
        data: [
          { id: '1', name: 'Entity 1' },
          { id: '2', name: 'Entity 2' },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 2,
          totalPages: 1
        }
      };
      process['result'] = testResult;

      // When
      const output = process.output();

      // Then
      expect(output).toBe(testResult);
    });
  });
});

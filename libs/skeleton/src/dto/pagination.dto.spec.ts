import { PaginationParamDTO } from './pagination.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

describe('PaginationParamDTO', () => {
  describe('validation', () => {
    it('should pass validation with valid number values', async () => {
      // Given
      const dto = plainToInstance(PaginationParamDTO, {
        page: 1,
        limit: 10
      });

      // When
      const errors = await validate(dto);

      // Then
      expect(errors.length).toBe(0);
      expect(dto.page).toBe(1);
      expect(dto.limit).toBe(10);
    });

    it('should pass validation with valid string number values', async () => {
      // Given
      const dto = plainToInstance(PaginationParamDTO, {
        page: '1',
        limit: '10'
      });

      // When
      const errors = await validate(dto);

      // Then
      expect(errors.length).toBe(0);
      expect(dto.page).toBe(1); // Transformed to number
      expect(dto.limit).toBe(10); // Transformed to number
    });

    it('should fail validation with missing page', async () => {
      // Given
      const dto = plainToInstance(PaginationParamDTO, {
        limit: 10
      });

      // When
      const errors = await validate(dto);

      // Then
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('page');
    });

    it('should fail validation with missing limit', async () => {
      // Given
      const dto = plainToInstance(PaginationParamDTO, {
        page: 1
      });

      // When
      const errors = await validate(dto);

      // Then
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('limit');
    });

    it('should fail validation with non-numeric page', async () => {
      // Given
      const dto = plainToInstance(PaginationParamDTO, {
        page: 'invalid',
        limit: 10
      });

      // When
      const errors = await validate(dto);

      // Then
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('page');
    });

    it('should fail validation with non-numeric limit', async () => {
      // Given
      const dto = plainToInstance(PaginationParamDTO, {
        page: 1,
        limit: 'invalid'
      });

      // When
      const errors = await validate(dto);

      // Then
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('limit');
    });
  });

  describe('interface implementation', () => {
    it('should correctly implement IPaginationParam interface', () => {
      // Given
      const dto = new PaginationParamDTO();
      dto.page = 1;
      dto.limit = 10;

      // Then
      expect(dto.page).toBe(1);
      expect(dto.limit).toBe(10);
    });
  });
});

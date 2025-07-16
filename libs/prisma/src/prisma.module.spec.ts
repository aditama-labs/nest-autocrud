import { Test } from '@nestjs/testing';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';
import { PRISMA_DELEGATE, PRISMA_RELATION } from './constants';
import {
  CREATE_PROCESS,
  DELETE_PROCESS,
  LIST_PROCESS,
  PAGINATION_PROCESS,
  READ_PROCESS,
  UPDATE_PROCESS,
} from '@aditama-labs/nest-autocrud/skeleton';
import {
  PrismaCreateProcess,
  PrismaDeleteProcess,
  PrismaPaginationProcess,
  PrismaReadProcess,
  PrismaUpdateProcess,
} from './processes';
import { PrismaListProcess } from './processes/list.process';

describe('PrismaModule', () => {
  describe('forRoot', () => {
    it('should provide the default processes when no options are provided', async () => {
      // Given
      const moduleRef = await Test.createTestingModule({
        imports: [
          PrismaModule.forRoot({
            delegate: (prisma: PrismaService) => prisma.user,
          }),
        ],
      }).compile();

      // Then
      expect(moduleRef.get(PrismaService)).toBeDefined();
      expect(moduleRef.get(PRISMA_DELEGATE)).toBeDefined();
      expect(moduleRef.get(PRISMA_RELATION)).toEqual([]);
      expect(moduleRef.get(CREATE_PROCESS)).toBeInstanceOf(PrismaCreateProcess);
      expect(moduleRef.get(DELETE_PROCESS)).toBeInstanceOf(PrismaDeleteProcess);
      expect(moduleRef.get(LIST_PROCESS)).toBeInstanceOf(PrismaListProcess);
      expect(moduleRef.get(PAGINATION_PROCESS)).toBeInstanceOf(PrismaPaginationProcess);
      expect(moduleRef.get(READ_PROCESS)).toBeInstanceOf(PrismaReadProcess);
      expect(moduleRef.get(UPDATE_PROCESS)).toBeInstanceOf(PrismaUpdateProcess);
    });

    it('should provide custom processes when options are provided', async () => {
      // Given
      class CustomCreateProcess extends PrismaCreateProcess {}
      class CustomDeleteProcess extends PrismaDeleteProcess {}
      class CustomListProcess extends PrismaListProcess {}
      class CustomPaginationProcess extends PrismaPaginationProcess {}
      class CustomReadProcess extends PrismaReadProcess {}
      class CustomUpdateProcess extends PrismaUpdateProcess {}

      const moduleRef = await Test.createTestingModule({
        imports: [
          PrismaModule.forRoot({
            delegate: (prisma: PrismaService) => prisma.user,
            relation: ['posts', 'comments'],
            processCreate: CustomCreateProcess,
            processDelete: CustomDeleteProcess,
            processList: CustomListProcess,
            processPagination: CustomPaginationProcess,
            processRead: CustomReadProcess,
            processUpdate: CustomUpdateProcess,
          }),
        ],
      }).compile();

      // Then
      expect(moduleRef.get(PrismaService)).toBeDefined();
      expect(moduleRef.get(PRISMA_DELEGATE)).toBeDefined();
      expect(moduleRef.get(PRISMA_RELATION)).toEqual(['posts', 'comments']);
      expect(moduleRef.get(CREATE_PROCESS)).toBeInstanceOf(CustomCreateProcess);
      expect(moduleRef.get(DELETE_PROCESS)).toBeInstanceOf(CustomDeleteProcess);
      expect(moduleRef.get(LIST_PROCESS)).toBeInstanceOf(CustomListProcess);
      expect(moduleRef.get(PAGINATION_PROCESS)).toBeInstanceOf(CustomPaginationProcess);
      expect(moduleRef.get(READ_PROCESS)).toBeInstanceOf(CustomReadProcess);
      expect(moduleRef.get(UPDATE_PROCESS)).toBeInstanceOf(CustomUpdateProcess);
    });
  });
});

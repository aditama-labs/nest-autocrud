import { PaginationProcess } from '@autocrud/skeleton/processes/pagination.process';

export abstract class PrismaPaginationProcess implements PaginationProcess {
  abstract initialization();
  abstract before();
  abstract begin();
  abstract process();
  abstract end();
  abstract after();
  abstract result();
}

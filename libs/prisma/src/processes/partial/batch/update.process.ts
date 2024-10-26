import { PartialBatchUpdateProcess } from '@autocrud/skeleton/processes/partial/batch/update.process';

export abstract class PrismaPartialBatchUpdateProcess
  implements PartialBatchUpdateProcess
{
  abstract initialization();
  abstract before();
  abstract begin();
  abstract process();
  abstract end();
  abstract after();
  abstract result();
}

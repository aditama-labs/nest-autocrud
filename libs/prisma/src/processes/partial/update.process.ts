import { PartialUpdateProcess } from '@autocrud/skeleton/processes/partial/update.process';

export abstract class PrismaPartialUpdateProcess
  implements PartialUpdateProcess
{
  abstract initialization();
  abstract before();
  abstract begin();
  abstract process();
  abstract end();
  abstract after();
  abstract result();
}

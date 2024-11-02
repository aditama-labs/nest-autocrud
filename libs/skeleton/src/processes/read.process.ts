import { DefaultProcess } from './default.process';

export class ReadProcess extends DefaultProcess {
  public identityData;
  public identityKey: string = 'id';
}

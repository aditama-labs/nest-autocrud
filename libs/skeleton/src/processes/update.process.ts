import { DefaultProcess } from './default.process';

export class UpdateProcess extends DefaultProcess {
  // @TODO: The property of id can be take from ReadProcess which is extended
  public identityData;
  public identityKey: string = 'id';
  // @TODO: The property of data can be take from CreateProcess which is extended
  public payload;
}

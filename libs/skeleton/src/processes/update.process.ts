import { DraftProcess } from './draft.process';

export class UpdateProcess extends DraftProcess {
  public identityData;
  public identityKey: string = 'id';
  public payload;
}

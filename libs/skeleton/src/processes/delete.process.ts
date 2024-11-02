import { DefaultProcess } from './default.process';

// @TODO: DeleteProcess and ReadProcess are the same, should be refactored next
export class DeleteProcess extends DefaultProcess {
  public identityData;
  public identityKey: string = 'id';
}

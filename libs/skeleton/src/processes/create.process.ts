import { DefaultProcess } from './default.process';

export class CreateProcess extends DefaultProcess {
  public payload;
  public isDraft: boolean = false;
}

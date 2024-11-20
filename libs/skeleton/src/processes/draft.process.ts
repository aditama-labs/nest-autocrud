import { DefaultProcess } from './default.process';
import { DraftDriver } from '../interfaces/draft-driver.interface';

export class DraftProcess extends DefaultProcess {
  public isDraft: boolean = false;
  private draftDriver: DraftDriver;

  constructor(draftDriver: DraftDriver) {
    super();
    this.draftDriver = draftDriver;
  }

  async process() {
    if (this.isDraft) {
      // Handle draft-specific logic
      console.log('Processing draft...');
      await this.draftDriver.saveDraft(this.payload);
    } else {
      await super.process();
    }
  }
}

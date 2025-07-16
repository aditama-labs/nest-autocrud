import { Injectable } from '@nestjs/common';
import { DraftableUpdateProcess } from '../../../libs/skeleton/src/draft/processes/draftable-update.process';

@Injectable()
export class UserUpdateProcess extends DraftableUpdateProcess {
  private draftCondition: boolean = false;

  /**
   * Set whether this process should use draft
   */
  setDraftMode(useDraft: boolean): void {
    this.draftCondition = useDraft;
  }

  /**
   * Determines if the current operation should be saved as a draft
   */
  async shouldSaveAsDraft(): Promise<boolean> {
    return this.draftCondition;
  }

  /**
   * Custom metadata for draft (optional)
   */
  async getDraftMetadata(): Promise<any> {
    return {
      user: 'current-user-id', // In a real app, this would come from authentication
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Override the process method to handle both draft and non-draft operations
   */
  async process() {
    // Draft condition check happens in parent class
    if (await this.shouldSaveAsDraft()) {
      // The parent class will handle draft saving
      return await super.process();
    }
    
    const self = this as any;
    
    // Process normal database operation (non-draft)
    console.log('Updating user in database:', {
      id: self.identityData,
      data: self.payload
    });
    
    // Example implementation (replace with actual database logic)
    self.result = {
      id: typeof self.identityData === 'string' ? self.identityData : self.identityData[self.identityKey],
      ...self.payload,
      updatedAt: new Date(),
    };
  }
}

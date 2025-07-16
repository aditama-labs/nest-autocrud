import { Injectable } from '@nestjs/common';
import { DraftableCreateProcess } from '../../../libs/skeleton/src/draft/processes/draftable-create.process';
import { DraftService } from '../../../libs/skeleton/src/draft/draft.service';

@Injectable()
export class UserCreateProcess extends DraftableCreateProcess {
  private draftCondition: boolean = false;

  /**
   * Set whether this process should use draft
   */
  setDraftMode(useDraft: boolean): void {
    this.draftCondition = useDraft;
  }

  /**
   * Determines if the current operation should be saved as a draft
   * This can be customized based on business rules or user input
   */
  async shouldSaveAsDraft(): Promise<boolean> {
    return this.draftCondition;
  }

  /**
   * Custom metadata for draft (optional)
   * For example, adding current user information
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
    // If shouldSaveAsDraft() returns true, it will save as draft
    // Otherwise, it will execute this method
    
    if (await this.shouldSaveAsDraft()) {
      // The parent class will handle draft saving
      return await super.process();
    }
    
    // Process normal database operation (non-draft)
    // This is your actual database save logic
    const self = this as any;
    console.log('Saving user to database:', self.payload);
    
    // Example implementation (replace with actual database logic)
    self.result = {
      id: 'generated-id',
      ...self.payload,
      createdAt: new Date(),
    };
  }
}

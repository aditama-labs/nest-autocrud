import { CreateProcess } from '../../processes/create.process';
import { DraftableMixin } from '../mixins/draftable.mixin';

/**
 * DraftableCreateProcess extends CreateProcess with draft functionality
 * This class can be used as a drop-in replacement for CreateProcess
 * when draft functionality is needed.
 */
export class DraftableCreateProcess extends DraftableMixin(CreateProcess) {
  /**
   * Override this method to implement custom draft logic
   * By default, this returns false (no draft)
   */
  async shouldSaveAsDraft(): Promise<boolean> {
    return false;
  }
  
  /**
   * Get entity ID for the draft
   * For create operations, this tries to use payload.id or generates a new ID
   */
  async getDraftEntityId(): Promise<string> {
    const self = this as any;
    
    // If payload has an ID, use it
    if (
      typeof self.payload === 'object' &&
      self.payload !== null &&
      self.payload.id
    ) {
      return self.payload.id;
    }
    
    // Otherwise use the parent implementation
    return super.getDraftEntityId();
  }
}

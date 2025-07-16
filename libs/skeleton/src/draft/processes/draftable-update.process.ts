import { UpdateProcess } from '../../processes/update.process';
import { DraftableMixin } from '../mixins/draftable.mixin';

/**
 * DraftableUpdateProcess extends UpdateProcess with draft functionality
 * This class can be used as a drop-in replacement for UpdateProcess
 * when draft functionality is needed.
 */
export class DraftableUpdateProcess extends DraftableMixin(UpdateProcess) {
  /**
   * Override this method to implement custom draft logic
   * By default, this returns false (no draft)
   */
  async shouldSaveAsDraft(): Promise<boolean> {
    return false;
  }

  /**
   * Get entity ID for the draft
   * For update operations, this uses the identityData
   */
  async getDraftEntityId(): Promise<string> {
    const self = this as any;
    
    // Use the identityData as the entity ID
    if (typeof self.identityData === 'string') {
      return self.identityData;
    }

    // If identityData is an object, use the identityKey to extract the ID
    if (
      typeof self.identityData === 'object' &&
      self.identityData !== null &&
      self.identityData[self.identityKey]
    ) {
      return self.identityData[self.identityKey];
    }

    // Fallback to the parent implementation
    return super.getDraftEntityId();
  }
}

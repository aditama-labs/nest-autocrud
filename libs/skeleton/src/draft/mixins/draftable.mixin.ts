import { v4 as uuidv4 } from 'uuid';
import { Constructor } from '../../types';
import { ISkeletonProcess } from '../../interfaces/skeleton-process.interface';
import { DraftService } from '../draft.service';

// Helper function to check if a property exists on an object
function hasProperty(obj: any, prop: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * A mixin that adds draft functionality to a process class
 * @param BaseClass The class to extend with draft functionality
 */
export function DraftableMixin<TBase extends Constructor<ISkeletonProcess>>(
  BaseClass: TBase,
) {
  return class extends BaseClass {
    protected draftService: DraftService = DraftService.getInstance();

    /**
     * Determines if the current operation should be saved as a draft
     * By default, this returns false
     * Override this method to implement custom draft logic
     */
    async shouldSaveAsDraft(): Promise<boolean> {
      return false;
    }

    /**
     * Get entity ID for the draft
     * This tries to use identityData, payload.id, or generates a new UUID
     */
    async getDraftEntityId(): Promise<string> {
      // If this is an update process with identityData
      if (hasProperty(this, 'identityData')) {
        const identityKey = hasProperty(this, 'identityKey')
          ? (this as any).identityKey
          : 'id';

        // Use identityData directly if it's a string
        if (typeof (this as any).identityData === 'string') {
          return (this as any).identityData;
        }

        // Otherwise, try to extract the ID using identityKey
        if (
          typeof (this as any).identityData === 'object' &&
          (this as any).identityData !== null &&
          hasProperty((this as any).identityData, identityKey)
        ) {
          return (this as any).identityData[identityKey];
        }
      }

      // If this is a create process with a payload that has an ID
      if (
        hasProperty(this, 'payload') &&
        typeof (this as any).payload === 'object' &&
        (this as any).payload !== null &&
        hasProperty((this as any).payload, 'id')
      ) {
        return (this as any).payload.id;
      }

      // Generate a new UUID if no ID is available
      return uuidv4();
    }

    /**
     * Get metadata for the draft
     * Override this to include custom metadata
     */
    async getDraftMetadata(): Promise<any> {
      return null;
    }

    /**
     * Override the process method to handle draft saving
     */
    async process() {
      // Check if draft service is enabled
      if (!this.draftService.isEnabled()) {
        // If draft service is not enabled, just call the original process method
        return await super.process();
      }

      // Check if this operation should be saved as a draft
      const isDraft = await this.shouldSaveAsDraft();
      if (!isDraft) {
        // If not a draft, proceed with the original process method
        return await super.process();
      }

      // Handle draft saving
      const entityId = await this.getDraftEntityId();
      const metadata = await this.getDraftMetadata();

      // Save data as draft
      // For create operations, save the payload
      if (hasProperty(this, 'payload')) {
        await this.draftService.saveDraft(
          entityId,
          (this as any).payload,
          metadata,
        );
      }
      // For update operations, save both the identity and payload
      else if (
        hasProperty(this, 'identityData') &&
        hasProperty(this, 'payload')
      ) {
        const draftData = {
          identityData: (this as any).identityData,
          payload: (this as any).payload,
        };
        await this.draftService.saveDraft(entityId, draftData, metadata);
      }

      // Set result to indicate draft was saved
      if (hasProperty(this, 'result')) {
        (this as any).result = {
          isDraft: true,
          entityId,
          timestamp: Date.now(),
          metadata,
        };
      }

      return;
    }
  };
}

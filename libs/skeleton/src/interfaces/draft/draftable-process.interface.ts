import { ISkeletonProcess } from '../skeleton-process.interface';

export interface IDraftableProcess extends ISkeletonProcess {
  /**
   * Determines if the current operation should be saved as a draft
   * instead of being stored in the main database
   */
  shouldSaveAsDraft?(): Promise<boolean>;
  
  /**
   * Get entity ID for the draft
   * If not implemented, the system will try to use the identityData or generate a new ID
   */
  getDraftEntityId?(): Promise<string>;
  
  /**
   * Get metadata for the draft
   * This can be used to store additional information like user ID
   */
  getDraftMetadata?(): Promise<any>;
}

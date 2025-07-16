import { IDraftDriver } from '../interfaces/draft/draft-driver.interface';

export abstract class BaseDraftDriver implements IDraftDriver {
  /**
   * Generate branch name for the draft
   * @param entityId - Unique identifier for the entity
   * @param timestamp - Timestamp of the draft
   * @param metadata - Optional metadata to include in the branch name
   */
  protected generateBranchName(
    entityId: string,
    timestamp: number,
    metadata?: any,
  ): string {
    let branchName = `${entityId}/${timestamp}`;
    
    if (metadata) {
      // Add metadata to branch name if provided
      if (typeof metadata === 'string') {
        branchName += `/${metadata}`;
      } else if (typeof metadata === 'object' && metadata !== null) {
        // If metadata is an object, handle it (example for user info)
        if (metadata.user) {
          branchName += `/${metadata.user}`;
        }
      }
    }
    
    return branchName;
  }

  /**
   * Parse branch name to extract components
   * @param branchName - Branch name to parse
   */
  protected parseBranchName(branchName: string): {
    entityId: string;
    timestamp: number;
    metadata?: string;
  } {
    const parts = branchName.split('/');
    return {
      entityId: parts[0],
      timestamp: parseInt(parts[1], 10),
      metadata: parts.length > 2 ? parts.slice(2).join('/') : undefined,
    };
  }

  abstract saveDraft(
    entityId: string,
    timestamp: number,
    data: any,
    metadata?: any,
  ): Promise<void>;

  abstract getDraft(entityId: string, timestamp: number): Promise<any>;

  abstract getDrafts(
    entityId: string,
  ): Promise<Array<{ timestamp: number; data: any; metadata?: any }>>;

  abstract deleteDraft(entityId: string, timestamp: number): Promise<void>;

  abstract deleteAllDrafts(entityId: string): Promise<void>;
}

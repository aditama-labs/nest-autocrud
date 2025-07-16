export interface IDraftDriver {
  /**
   * Save draft data
   * @param entityId - Unique identifier for the entity
   * @param timestamp - Timestamp of the draft
   * @param data - The draft data to save
   * @param metadata - Optional metadata for the draft
   */
  saveDraft(entityId: string, timestamp: number, data: any, metadata?: any): Promise<void>;

  /**
   * Get a specific draft
   * @param entityId - Unique identifier for the entity
   * @param timestamp - Timestamp of the draft
   */
  getDraft(entityId: string, timestamp: number): Promise<any>;

  /**
   * Get all drafts for an entity
   * @param entityId - Unique identifier for the entity
   */
  getDrafts(entityId: string): Promise<Array<{ timestamp: number; data: any; metadata?: any }>>;

  /**
   * Delete a specific draft
   * @param entityId - Unique identifier for the entity
   * @param timestamp - Timestamp of the draft
   */
  deleteDraft(entityId: string, timestamp: number): Promise<void>;

  /**
   * Delete all drafts for an entity
   * @param entityId - Unique identifier for the entity
   */
  deleteAllDrafts(entityId: string): Promise<void>;
}

import { IDraftDriver } from '../interfaces/draft/draft-driver.interface';
import { DiskDraftDriver } from './disk-draft-driver';

export enum DraftDriverType {
  DISK = 'disk',
  // Future drivers
  // MYSQL = 'mysql',
  // MONGODB = 'mongodb',
  // POSTGRESQL = 'postgresql',
}

export interface DraftOptions {
  /**
   * The type of draft driver to use
   */
  driver: DraftDriverType;
  
  /**
   * Options for the disk driver
   */
  diskOptions?: {
    /**
     * Base path for storing draft files
     */
    basePath: string;
  };
  
  // Future driver options
  // mysqlOptions?: {...};
  // mongodbOptions?: {...};
  // postgresqlOptions?: {...};
}

export class DraftService {
  private static instance: DraftService;
  private draftDriver: IDraftDriver;
  private enabled: boolean = false;

  private constructor() {}

  /**
   * Get the singleton instance of DraftService
   */
  public static getInstance(): DraftService {
    if (!DraftService.instance) {
      DraftService.instance = new DraftService();
    }
    return DraftService.instance;
  }

  /**
   * Initialize the draft service with the specified driver
   * @param options - Configuration options for the draft service
   */
  public initialize(options: DraftOptions): void {
    this.enabled = true;

    switch (options.driver) {
      case DraftDriverType.DISK:
        if (!options.diskOptions?.basePath) {
          throw new Error('Disk draft driver requires basePath option');
        }
        this.draftDriver = new DiskDraftDriver({
          basePath: options.diskOptions.basePath,
        });
        break;
      default:
        throw new Error(`Draft driver ${options.driver} not supported`);
    }
  }

  /**
   * Check if draft service is enabled
   */
  public isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Get the draft driver
   */
  public getDriver(): IDraftDriver {
    if (!this.enabled || !this.draftDriver) {
      throw new Error('Draft service not initialized');
    }
    return this.draftDriver;
  }

  /**
   * Save a draft
   */
  public async saveDraft(
    entityId: string, 
    data: any, 
    metadata?: any
  ): Promise<void> {
    if (!this.enabled) return;
    
    const timestamp = Date.now();
    await this.draftDriver.saveDraft(entityId, timestamp, data, metadata);
  }

  /**
   * Get all drafts for an entity
   */
  public async getDrafts(
    entityId: string
  ): Promise<Array<{ timestamp: number; data: any; metadata?: any }>> {
    if (!this.enabled) return [];
    
    return await this.draftDriver.getDrafts(entityId);
  }

  /**
   * Get a specific draft
   */
  public async getDraft(entityId: string, timestamp: number): Promise<any> {
    if (!this.enabled) return null;
    
    return await this.draftDriver.getDraft(entityId, timestamp);
  }

  /**
   * Delete a specific draft
   */
  public async deleteDraft(entityId: string, timestamp: number): Promise<void> {
    if (!this.enabled) return;
    
    await this.draftDriver.deleteDraft(entityId, timestamp);
  }

  /**
   * Delete all drafts for an entity
   */
  public async deleteAllDrafts(entityId: string): Promise<void> {
    if (!this.enabled) return;
    
    await this.draftDriver.deleteAllDrafts(entityId);
  }
}

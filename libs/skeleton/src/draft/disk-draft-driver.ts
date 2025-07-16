import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { BaseDraftDriver } from './base-draft-driver';

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);
const stat = promisify(fs.stat);

export class DiskDraftDriver extends BaseDraftDriver {
  private basePath: string;

  constructor(options: { basePath: string }) {
    super();
    this.basePath = options.basePath;
    this.ensureBaseDirectoryExists();
  }

  private async ensureBaseDirectoryExists(): Promise<void> {
    try {
      await stat(this.basePath);
    } catch (error) {
      // Directory doesn't exist, create it
      await mkdir(this.basePath, { recursive: true });
    }
  }

  private async ensureEntityDirectoryExists(entityId: string): Promise<string> {
    const entityDir = path.join(this.basePath, entityId);
    try {
      await stat(entityDir);
    } catch (error) {
      // Directory doesn't exist, create it
      await mkdir(entityDir, { recursive: true });
    }
    return entityDir;
  }

  private getDraftFilePath(entityId: string, timestamp: number): string {
    return path.join(this.basePath, entityId, `${timestamp}.json`);
  }

  async saveDraft(
    entityId: string, 
    timestamp: number,
    data: any,
    metadata?: any
  ): Promise<void> {
    await this.ensureEntityDirectoryExists(entityId);
    
    const draftData = {
      branch: this.generateBranchName(entityId, timestamp, metadata),
      timestamp,
      data,
      metadata,
      createdAt: new Date().toISOString(),
    };
    
    const filePath = this.getDraftFilePath(entityId, timestamp);
    await writeFile(filePath, JSON.stringify(draftData, null, 2), 'utf8');
  }

  async getDraft(entityId: string, timestamp: number): Promise<any> {
    try {
      const filePath = this.getDraftFilePath(entityId, timestamp);
      const content = await readFile(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Draft not found for entity ${entityId} at timestamp ${timestamp}`);
    }
  }

  async getDrafts(
    entityId: string
  ): Promise<Array<{ timestamp: number; data: any; metadata?: any }>> {
    try {
      const entityDir = path.join(this.basePath, entityId);
      
      try {
        await stat(entityDir);
      } catch (error) {
        // Directory doesn't exist, return empty array
        return [];
      }
      
      const files = await readdir(entityDir);
      const draftFiles = files.filter(file => file.endsWith('.json'));
      
      const drafts = await Promise.all(
        draftFiles.map(async file => {
          const filePath = path.join(entityDir, file);
          const content = await readFile(filePath, 'utf8');
          const draft = JSON.parse(content);
          return {
            timestamp: draft.timestamp,
            data: draft.data,
            metadata: draft.metadata,
          };
        })
      );
      
      // Sort drafts by timestamp (newest first)
      return drafts.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      return [];
    }
  }

  async deleteDraft(entityId: string, timestamp: number): Promise<void> {
    try {
      const filePath = this.getDraftFilePath(entityId, timestamp);
      await unlink(filePath);
    } catch (error) {
      throw new Error(`Failed to delete draft for entity ${entityId} at timestamp ${timestamp}`);
    }
  }

  async deleteAllDrafts(entityId: string): Promise<void> {
    try {
      const entityDir = path.join(this.basePath, entityId);
      
      try {
        await stat(entityDir);
      } catch (error) {
        // Directory doesn't exist, nothing to delete
        return;
      }
      
      const files = await readdir(entityDir);
      
      // Delete all files in the directory
      await Promise.all(
        files.map(async file => {
          const filePath = path.join(entityDir, file);
          await unlink(filePath);
        })
      );
      
      // Delete the directory itself
      await rmdir(entityDir);
    } catch (error) {
      throw new Error(`Failed to delete all drafts for entity ${entityId}`);
    }
  }
}

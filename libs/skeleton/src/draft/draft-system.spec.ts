import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { DraftDriverType, DraftService } from './draft.service';

const mkdtemp = promisify(fs.mkdtemp);
const rmdir = promisify(fs.rmdir);
const readdir = promisify(fs.readdir);

describe('DraftSystem', () => {
  let draftService: DraftService;
  let tempDir: string;

  beforeEach(async () => {
    // Create a temporary directory for testing
    tempDir = await mkdtemp('test-draft-');

    // Initialize the draft service with the disk driver
    draftService = DraftService.getInstance();
    draftService.initialize({
      driver: DraftDriverType.DISK,
      diskOptions: {
        basePath: tempDir,
      },
    });
  });

  afterEach(async () => {
    // Clean up test directory
    if (tempDir) {
      try {
        // Get all files and directories in the temp dir
        const entries = await readdir(tempDir, { withFileTypes: true });

        // Delete all files and subdirectories
        for (const entry of entries) {
          const fullPath = path.join(tempDir, entry.name);
          if (entry.isDirectory()) {
            await rmdir(fullPath, { recursive: true });
          } else {
            await fs.promises.unlink(fullPath);
          }
        }

        // Delete the temp dir itself
        await rmdir(tempDir);
      } catch (error) {
        console.error('Error cleaning up temp dir:', error);
      }
    }
  });

  it('should save and retrieve drafts', async () => {
    const entityId = 'test-entity-1';
    const draftData = { name: 'Test Entity', description: 'A test entity' };

    // Save draft
    await draftService.saveDraft(entityId, draftData);

    // Get drafts
    const drafts = await draftService.getDrafts(entityId);

    // Assertions
    expect(drafts).toBeDefined();
    expect(drafts.length).toBe(1);
    expect(drafts[0].data).toEqual(draftData);
  });

  it('should handle multiple drafts for the same entity', async () => {
    const entityId = 'test-entity-2';
    const draftData1 = { name: 'Version 1', value: 100 };
    const draftData2 = { name: 'Version 2', value: 200 };

    // Simulate a delay between drafts
    await draftService.saveDraft(entityId, draftData1);
    await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms delay
    await draftService.saveDraft(entityId, draftData2);

    // Get drafts
    const drafts = await draftService.getDrafts(entityId);

    // Assertions
    expect(drafts).toBeDefined();
    expect(drafts.length).toBe(2);
    expect(drafts[0].data).toEqual(draftData2); // Newest first
    expect(drafts[1].data).toEqual(draftData1);
  });

  it('should delete a specific draft', async () => {
    const entityId = 'test-entity-3';
    const draftData = { name: 'Draft to delete' };

    // Save draft
    await draftService.saveDraft(entityId, draftData);

    // Get drafts to find the timestamp
    const drafts = await draftService.getDrafts(entityId);
    expect(drafts.length).toBe(1);

    // Delete the draft
    await draftService.deleteDraft(entityId, drafts[0].timestamp);

    // Verify it's gone
    const updatedDrafts = await draftService.getDrafts(entityId);
    expect(updatedDrafts.length).toBe(0);
  });

  it('should delete all drafts for an entity', async () => {
    const entityId = 'test-entity-4';

    // Save multiple drafts with delays to ensure unique timestamps
    await draftService.saveDraft(entityId, { version: 1 });
    await new Promise((resolve) => setTimeout(resolve, 10));
    await draftService.saveDraft(entityId, { version: 2 });
    await new Promise((resolve) => setTimeout(resolve, 10));
    await draftService.saveDraft(entityId, { version: 3 });

    // Verify drafts are saved
    const drafts = await draftService.getDrafts(entityId);
    expect(drafts.length).toBe(3);

    // Delete all drafts
    await draftService.deleteAllDrafts(entityId);

    // Verify they're all gone
    const updatedDrafts = await draftService.getDrafts(entityId);
    expect(updatedDrafts.length).toBe(0);
  });

  it('should store and retrieve metadata', async () => {
    const entityId = 'test-entity-5';
    const draftData = { content: 'Draft with metadata' };
    const metadata = { user: 'user-123', reason: 'Testing metadata' };

    // Save draft with metadata
    await draftService.saveDraft(entityId, draftData, metadata);

    // Get drafts
    const drafts = await draftService.getDrafts(entityId);

    // Assertions
    expect(drafts.length).toBe(1);
    expect(drafts[0].metadata).toEqual(metadata);
  });
});

# Draft System for nest-autocrud

The Draft System allows you to store draft data during create and update operations, similar to how Git works with branches. This enables implementing features like:

- Save draft versions of entities before committing them to the main database
- Maintain a history of changes with timestamps
- Support multiple versions of data with metadata

## Key Features

- Git-like branching system for data (`<entity-id>/<timestamp>`)
- Extendable branch naming (e.g., `<entity-id>/<timestamp>/<user-id>`)
- Pluggable storage drivers (currently: Disk, with plans for MySQL, MongoDB, PostgreSQL)
- Seamlessly integrates with existing create and update processors

## Installation

The Draft System is included in the nest-autocrud library.

## Basic Usage

### 1. Register the Draft Module

```typescript
import { Module } from '@nestjs/common';
import { DraftModule, DraftDriverType } from '@aditama-labs/nest-autocrud';
import * as path from 'path';

@Module({
  imports: [
    DraftModule.register({
      driver: DraftDriverType.DISK,
      diskOptions: {
        basePath: path.join(process.cwd(), 'drafts'),
      },
    }),
  ],
  // ...
})
export class AppModule {}
```

### 2. Use Draftable Processes

Instead of the regular `CreateProcess` and `UpdateProcess`, use `DraftableCreateProcess` and `DraftableUpdateProcess`:

```typescript
import { Injectable } from '@nestjs/common';
import { DraftableCreateProcess } from '@aditama-labs/nest-autocrud';

@Injectable()
export class UserCreateProcess extends DraftableCreateProcess {
  /**
   * Override to determine when to save as draft
   */
  async shouldSaveAsDraft(): Promise<boolean> {
    // Your logic to decide if this operation should be saved as draft
    // For example, check a flag in the payload or context
    return this.payload.saveAsDraft === true;
  }

  /**
   * Override to add custom metadata to drafts
   */
  async getDraftMetadata(): Promise<any> {
    return {
      user: 'current-user-id', // In a real app, from authentication
      reason: this.payload.draftReason,
    };
  }

  /**
   * Your normal process implementation
   */
  async process() {
    // The parent class will handle draft vs. normal operation
    // If shouldSaveAsDraft() returns true, it saves as draft
    // Otherwise, it executes this method
    await super.process();
    
    // Only runs for non-draft operations
    if (!(await this.shouldSaveAsDraft())) {
      // Your actual database save logic
      // ...
    }
  }
}
```

### 3. Use the DraftService API

The DraftService provides methods to work with drafts:

```typescript
import { DraftService } from '@aditama-labs/nest-autocrud';

@Controller('users')
export class UserController {
  constructor(private draftService: DraftService) {}

  @Get('drafts/:entityId')
  async getUserDrafts(@Param('entityId') entityId: string) {
    return await this.draftService.getDrafts(entityId);
  }

  @Get('drafts/:entityId/:timestamp')
  async getUserDraft(
    @Param('entityId') entityId: string,
    @Param('timestamp') timestamp: string,
  ) {
    return await this.draftService.getDraft(entityId, parseInt(timestamp, 10));
  }
  
  @Delete('drafts/:entityId/:timestamp')
  async deleteUserDraft(
    @Param('entityId') entityId: string,
    @Param('timestamp') timestamp: string,
  ) {
    await this.draftService.deleteDraft(entityId, parseInt(timestamp, 10));
    return { success: true };
  }
}
```

## Custom Draft Drivers

The Draft System is designed to be extensible. You can create custom draft storage drivers by implementing the `IDraftDriver` interface and extending the `BaseDraftDriver` class.

Future planned drivers include:
- MySQL 
- MongoDB
- PostgreSQL

## Configuration Options

```typescript
DraftModule.register({
  // Choose the driver (currently only 'disk' is available)
  driver: DraftDriverType.DISK,
  
  // Options for the disk driver
  diskOptions: {
    basePath: '/path/to/drafts',
  },
  
  // Future driver options
  // mysqlOptions: { ... },
  // mongodbOptions: { ... },
  // postgresqlOptions: { ... },
})
```

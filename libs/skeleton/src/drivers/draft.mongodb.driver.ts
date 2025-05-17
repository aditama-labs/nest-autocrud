import { MongoClient } from 'mongodb';

class DraftMongoDBDriver implements DraftDriverInterface {
  private client: MongoClient;
  private dbName = 'autocrud';
  private collectionName = 'drafts';

  constructor(uri: string) {
    this.client = new MongoClient(uri);
  }

  private async getCollection() {
    if (!this.client?.db) {
      await this.client.connect();
    }
    return this.client.db(this.dbName).collection(this.collectionName);
  }

  async createDraft(draft: any): Promise<any> {
    const collection = await this.getCollection();
    const result = await collection.insertOne(draft);
    return { ...draft, _id: result.insertedId };
  }

  getDraft = async (draftId: string): Promise<any> => {
    const collection = await this.getCollection();
    const draft = await collection.findOne({
      _id: new (require('mongodb').ObjectId)(draftId),
    });
    return draft;
  };

  updateDraft = async (draftId: string, draft: any): Promise<any> => {
    const collection = await this.getCollection();
    await collection.updateOne(
      { _id: new (require('mongodb').ObjectId)(draftId) },
      { $set: draft },
    );
    return { ...draft, _id: draftId };
  };

  deleteDraft = async (draftId: string): Promise<any> => {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({
      _id: new (require('mongodb').ObjectId)(draftId),
    });
    return { deleted: result.deletedCount === 1 };
  };
}

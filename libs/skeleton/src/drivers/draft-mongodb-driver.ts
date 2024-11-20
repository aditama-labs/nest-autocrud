import { MongoClient } from 'mongodb';
import { DraftDriver } from '../interfaces/draft-driver.interface';

export class DraftMongoDBDriver implements DraftDriver {
  private client: MongoClient;
  private dbName: string;
  private collectionName: string;

  constructor(uri: string, dbName: string, collectionName: string) {
    this.client = new MongoClient(uri);
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  async connect() {
    await this.client.connect();
  }

  async saveDraft(data: any): Promise<void> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);
    await collection.insertOne(data);
  }

  async loadDraft(id: string): Promise<any> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);
    return await collection.findOne({ _id: id });
  }

  async deleteDraft(id: string): Promise<void> {
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collectionName);
    await collection.deleteOne({ _id: id });
  }
}

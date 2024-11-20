export interface DraftDriver {
  saveDraft(data: any): Promise<void>;
  loadDraft(id: string): Promise<any>;
  deleteDraft(id: string): Promise<void>;
}

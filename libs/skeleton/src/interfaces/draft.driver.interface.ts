interface DraftDriverInterface {
  createDraft: (draft: any) => Promise<any>;
  getDraft: (draftId: string) => Promise<any>;
  updateDraft: (draftId: string, draft: any) => Promise<any>;
  deleteDraft: (draftId: string) => Promise<any>;
}

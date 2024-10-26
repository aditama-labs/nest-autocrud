export interface StandardProcess {
  Initialization(): void;
  Before(): void;
  Begin(): void;
  Process(): void;
  End(): void;
  After(): void;
}

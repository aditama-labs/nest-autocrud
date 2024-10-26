export interface StandardProcess {
  initialization(): void;
  before(): void;
  begin(): void;
  process(): void;
  end(): void;
  after(): void;

  result();
}

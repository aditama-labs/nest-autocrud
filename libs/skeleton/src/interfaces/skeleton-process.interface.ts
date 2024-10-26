export interface SkeletonProcess {
  initialization(): void;
  before(): void;
  begin(): void;
  process(): void;
  end(): void;
  after(): void;

  result();
}

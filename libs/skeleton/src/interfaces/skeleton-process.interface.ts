import { Observable } from 'rxjs';

export interface SkeletonProcess {
  initialization(): Observable<void>;
  before(): Observable<void>;
  begin(): Observable<void>;
  process(): Observable<void>;
  end(): Observable<void>;
  after(): Observable<void>;
}

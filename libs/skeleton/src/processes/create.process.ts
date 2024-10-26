import { Observable, of } from 'rxjs';
import { SkeletonProcess } from '../interfaces/skeleton-process.interface';

export class CreateProcess implements SkeletonProcess {
  constructor() {}

  initialization(): Observable<void> {
    return of(undefined);
  }

  before(): Observable<void> {
    return of(undefined);
  }

  begin(): Observable<void> {
    return of(undefined);
  }

  process(): Observable<void> {
    return of(undefined);
  }

  end(): Observable<void> {
    return of(undefined);
  }

  after(): Observable<void> {
    return of(undefined);
  }
}

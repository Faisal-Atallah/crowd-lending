import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, finalize, of, tap } from 'rxjs';

@Injectable()
export class LoadingIndicatorService {

  private _loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  loading$: Observable<boolean> = this._loadingSubject.asObservable();

  /**
   * Show Loading Indicator Until Completed
   * @param {Observable<T>}obs$ 
   * @returns {Observable<T>}
   */
  showLoadingIndicatorUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.showLoadingIndicator()),
      concatMap(() => obs$),
      finalize(() => this.hideLoadingIndicator())
    );
  }

  /**
   * Show Loading Indicator
   */
  showLoadingIndicator(): void {
    this._loadingSubject.next(true);
  }

  /**
   * Hide Loading Indicator
   */
  hideLoadingIndicator(): void {
    this._loadingSubject.next(false);
  }
}

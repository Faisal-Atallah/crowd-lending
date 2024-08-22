import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpLoadingService {
  private _httpLoading$ = new ReplaySubject<boolean>(1);
  constructor() { }

  /**
   * Http Progress
   * @returns {Observable<boolean>}
   */
  httpProgress(): Observable<boolean> {
    return this._httpLoading$.asObservable();
  }

  /**
   * Set Http Progress Status
   * @param {boolean} inprogess 
   */
  setHttpProgressStatus(inprogess: boolean) {
    this._httpLoading$.next(inprogess);
  }
}

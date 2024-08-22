import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { showErrorToast } from '../utils';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private _messageService: MessageService,
    private _router: Router
  ) { }


  /**
   * 
   * @param {any}error 
   * @param {string}path 
   * @returns {Observable<any>}
   */
  handleErrorWithNavigation(error: any, path: string = ''): Observable<any> {
    // You can add custom error handling logic here
    this._showErrorMessage(error);
    this._router.navigate([path]);
    // Re-throw the error to let the calling code handle it as well
    return throwError(error);
  }

  /**
   * Handle Error WithNavigation Without Toats
   * @param error 
   * @param {string} path 
   * @returns {Observable<any> }
   */
  handleErrorWithNavigationWithoutToats(error: any, path: string = ''): Observable<any> {
    this._router.navigate([path]);
    return throwError(error);
  }


  /**
   * Handle Error
   * @param {any}error 
   * @param {string} message 
   * @returns {Observable<any>}
   */
  handleError(error: any, message: string): Observable<any> {
    this._showErrorMessage(message);
    // Re-throw the error to let the calling code handle it as well
    return throwError(error);
  }


  /**
   * Show Error Message 
   * @param {any}error 
   */
  private _showErrorMessage(error: any): void {
    showErrorToast(error, 'Error', this._messageService);
  }

}

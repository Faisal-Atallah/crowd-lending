import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, shareReplay, tap } from 'rxjs';
import { Portfolio } from './portfolio.types';
import { environment } from 'src/environments/environment';
import { PORTFOLIO_ENDPOINT } from './portfolio.constants';
import { StorageService } from 'src/app/core/helpers/storage';
import { ErrorHandlerService } from 'src/app/core/errors/error-handler.service';
import { SOMTHING_WENT_WRONG_ROUTE_PATH } from '../error/something-went-wrong';
import { customerInfo } from 'src/app/core/customer';
import { LanguageService } from 'src/app/core/language';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private readonly _portofolio: BehaviorSubject<Portfolio[] | null> = new BehaviorSubject<Portfolio[] | null>([]);


  get portfolio$(): Observable<Portfolio[] | null> {
    return this._portofolio.asObservable();
  }

  constructor(
    private _httpClient: HttpClient,
    private _storageService: StorageService,
    private _errorHandlerService: ErrorHandlerService,
    private _languageService: LanguageService
  ) { }



  /**
   * Get Portfolio
   * @returns {Observable<Portfolio>}
   */
  getPortfolio(): Observable<Portfolio[]> {
    return this._httpClient.post<Portfolio[]>(`${environment.serverOrigin}${PORTFOLIO_ENDPOINT}`,
      customerInfo(this._storageService, this._languageService))
      .pipe(
        catchError((error) => {
          return this._errorHandlerService.handleErrorWithNavigationWithoutToats(error, SOMTHING_WENT_WRONG_ROUTE_PATH);
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
        tap((portfolio: Portfolio[]) => {
          this._portofolio.next(portfolio);
        }));
  }

}

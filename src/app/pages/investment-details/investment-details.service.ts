import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, shareReplay, take, tap } from 'rxjs';
import { httpOptions } from 'src/app/core/utils';
import { environment } from 'src/environments/environment';
import { INVESTMENT_DETAILS_ENDPOINT } from './investment-details.constants';
import { LanguageService } from 'src/app/core/language';
import { StorageService } from 'src/app/core/helpers/storage';
import { ErrorHandlerService } from 'src/app/core/errors/error-handler.service';
import { SOMTHING_WENT_WRONG_ROUTE_PATH } from '../error/something-went-wrong';
import { investmentDetailsData } from './investment-details.data';

@Injectable({
  providedIn: 'root'
})
export class InvestmentDetailsService {

  private _investmentDetails: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private _httpClient: HttpClient,
    private _languageService: LanguageService,
    private _storageService: StorageService,
    private _errorHandlerService: ErrorHandlerService
  ) { }

  get investmentDetaisl$(): Observable<any> {
    return this._investmentDetails.asObservable();
  }

  /**
   * Get Investment Details
   * @param {number} sectorId 
   * @param {string} prodKey 
   * @returns {Observable<any>}
   */
  getInvestmentDetails(sectorId: number, prodKey: string): Observable<any> {
    return this._httpClient.post(`${environment.serverOrigin}${INVESTMENT_DETAILS_ENDPOINT}`, JSON.stringify(investmentDetailsData(sectorId, this._storageService, this._languageService, prodKey)), httpOptions).pipe(
      take(1),
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError((error) => {
        return this._errorHandlerService.handleErrorWithNavigationWithoutToats(error, SOMTHING_WENT_WRONG_ROUTE_PATH);
      }),
      tap((investmentDetails) => {
        this._investmentDetails.next(investmentDetails);
      }));
  }

}

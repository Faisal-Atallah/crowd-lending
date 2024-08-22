import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, debounceTime, map, shareReplay, take, tap } from 'rxjs';
import { Invest, InvestData, SectorFilter } from './invets.types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { INVESTMENTS_ENDPOINT, INVEST_ENDPOINT, SECTORS_FILTER_ENDPOINT, SUFFICIENT_AMOUNT_ENDPOINT } from './invest.constants';
import { httpOptions } from 'src/app/core/utils';
import { StorageService } from 'src/app/core/helpers/storage';
import { customerInfo } from 'src/app/core/customer';
import { ErrorHandlerService } from 'src/app/core/errors/error-handler.service';
import { SOMTHING_WENT_WRONG_ROUTE_PATH } from '../error/something-went-wrong';
import { LanguageService } from 'src/app/core/language';
import { TranslateService } from '@ngx-translate/core';
import { SuccessHandlerService } from 'src/app/core/success';
import { amountCheckData, doInvestData } from './invest.data';

@Injectable({
  providedIn: 'root'
})
export class InvestService {

  private readonly _investments: BehaviorSubject<Invest[]> = new BehaviorSubject<Invest[]>([]);
  private readonly _sectors: BehaviorSubject<SectorFilter[]> = new BehaviorSubject<SectorFilter[]>([]);

  constructor(
    private _httpClient: HttpClient,
    private _languageService: LanguageService,
    private _successHandlerService: SuccessHandlerService,
    private _errorHandlerService: ErrorHandlerService,
    private _storageService: StorageService,
    private _translate: TranslateService
  ) { }

  get investments$(): Observable<Invest[]> {
    return this._investments.asObservable();
  }

  get sectors$(): Observable<SectorFilter[]> {
    return this._sectors.asObservable();
  }

  /**
  * Get Investments
  * @returns {Observable<Invest[]>}
  */
  getInvestments(): Observable<Invest[]> {
    return this._httpClient.post<Invest[]>(`${environment.serverOrigin}${INVESTMENTS_ENDPOINT}`,
      JSON.stringify(customerInfo(this._storageService, this._languageService)), httpOptions)
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        catchError((error) => {
          return this._errorHandlerService.handleErrorWithNavigationWithoutToats(error, SOMTHING_WENT_WRONG_ROUTE_PATH);
        }),
        tap((invests) => {
          this._investments.next(invests);
        }));
  }

  /**
  * Get Sectors Filter
  * @returns {Observable<any>}
  */
  getSectorsFilter(): Observable<SectorFilter[]> {
    return this._httpClient.post<SectorFilter[]>(`${environment.serverOrigin}${SECTORS_FILTER_ENDPOINT}`, JSON.stringify(customerInfo(this._storageService, this._languageService)), httpOptions)
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        tap((sectors) => {
          this._sectors.next(sectors);
        }));
  }

  /**
   * Invest
   * @param {InvestData} investData 
   * @returns {Observable<any>}
   */
  invest(investData: InvestData): Observable<any> {
    return this._httpClient.post(`${environment.serverOrigin}${INVEST_ENDPOINT}`, JSON.stringify(doInvestData(investData, this._storageService)), httpOptions)
      .pipe(
        take(1),
        catchError((error) => {
          return this._errorHandlerService.handleError(error, this._translate.instant('something-went-wrong'))
        }),
        map(() => {
          this._successHandlerService.handleSuccess(this._translate.instant('invest-successfully'))
        })
      );
  }


  /**
   * Check Amount Is Sufficient
   * @param amount 
   * @returns {Observable<any>}
   */
  checkAmountIsSufficient(amount: string): Observable<boolean | any> {
    return this._httpClient.post<any>(`${environment.serverOrigin}${SUFFICIENT_AMOUNT_ENDPOINT}`, JSON.stringify(amountCheckData(amount, this._storageService)), httpOptions).pipe(
      debounceTime(500),
    )
  }

}

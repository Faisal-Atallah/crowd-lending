import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, shareReplay, take, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NO_ENOUGH_BALANCE, WALLET_ADD_BALANCE, WALLET_BALANCE_ENDPOINT, WALLET_WITHDRAW_BALANCE } from './wallet.constants';
import { httpOptions } from 'src/app/core/utils';
import { SuccessHandlerService } from 'src/app/core/success';
import { ErrorHandlerService } from 'src/app/core/errors/error-handler.service';
import { SOMTHING_WENT_WRONG_ROUTE_PATH } from '../error/something-went-wrong';
import { StorageService } from 'src/app/core/helpers/storage';
import { walletData } from './wallet.data';
import { Wallet } from './wallet.types';
import { TranslateService } from '@ngx-translate/core';
import { customerInfo } from 'src/app/core/customer';
import { LanguageService } from 'src/app/core/language';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private readonly _walletBalance: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  get walletBalance$(): Observable<any> {
    return this._walletBalance.asObservable();
  }

  constructor(
    private _httpClient: HttpClient,
    private _successHandlerService: SuccessHandlerService,
    private _errorHandlerService: ErrorHandlerService,
    private _storageService: StorageService,
    private _translate: TranslateService,
    private _languageService: LanguageService
  ) { }


  /**
   * Get Wallet Balanace
   * @returns {Observable<any>}
   */
  getWalletBalanace(): Observable<any> {
    return this._httpClient.post<any>(`${environment.serverOrigin}${WALLET_BALANCE_ENDPOINT}`, customerInfo(this._storageService, this._languageService))
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        catchError((error) => {
          return this._errorHandlerService.handleErrorWithNavigationWithoutToats(error, SOMTHING_WENT_WRONG_ROUTE_PATH);
        }),
        tap((balance) => {
          this._walletBalance.next(balance);
        })
      );
  }


  /**
   * Add Balance
   * @param {Wallet}wallet 
   * @returns {Observable<any>}
   */
  addBalance(wallet: Wallet): Observable<any> {
    return this._httpClient.put(`${environment.serverOrigin}${WALLET_ADD_BALANCE}`, JSON.stringify(walletData(wallet, this._storageService)), httpOptions)
      .pipe(
        take(1),
        catchError((error) => {
          return this._errorHandlerService.handleError(error, this._translate.instant('something-went-wrong'))
        }),
        map((balance) => {
          this._walletBalance.next(balance);
          this._successHandlerService.handleSuccess(this._translate.instant('money-added-successfully'))
          return balance;
        })
      );
  }

  /**
   * Withdraw Balance
   * @param {Wallet} wallet 
   * @returns {Observable<any>}
   */
  withdrawWalletBalance(wallet: Wallet): Observable<any> {
    return this._httpClient.put(`${environment.serverOrigin}${WALLET_WITHDRAW_BALANCE}`, JSON.stringify(walletData(wallet, this._storageService)), httpOptions)
      .pipe(
        take(1),
        map((balance) => {
          this._walletBalance.next(balance);
          this._successHandlerService.handleSuccess(this._translate.instant('money-withdrawn-successfully'))
          return balance;
        }),
        catchError((error) => {
          if (error.error.text !== NO_ENOUGH_BALANCE) {
            return this._errorHandlerService.handleError(error, this._translate.instant('something-went-wrong'));
          }
          return throwError(error);
        }),
      );
  }


}

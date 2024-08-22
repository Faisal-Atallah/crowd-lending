import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TRANSACTIONS_ENDPOINT } from './transactions.constants';
import { httpOptions } from 'src/app/core/utils';
import { TransactionData } from './transactions.types';
import { transactionsData } from './transactions.data';
import { StorageService } from 'src/app/core/helpers/storage';
import { ErrorHandlerService } from 'src/app/core/errors/error-handler.service';
import { SOMTHING_WENT_WRONG_ROUTE_PATH } from '../error/something-went-wrong';
import { LanguageService } from 'src/app/core/language';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private _transactions: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>([]);
  private _transaction: BehaviorSubject<TransactionData[]> = new BehaviorSubject<TransactionData[]>([]);
  private _investment: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private _httpClient: HttpClient,
    private _storageService: StorageService,
    private _errorHandlerService: ErrorHandlerService,
    private _languageService: LanguageService
  ) { }

  get transaction$(): Observable<any> {
    return this._transaction.asObservable();
  }

  get transactions$(): Observable<any[] | null> {
    return this._transactions.asObservable()
  }

  set investment(value: any) {
    this._investment.next(value);
  }

  get investment$(): Observable<any> {
    return this._investment.asObservable();
  }

  /**
   * Get Transaction By Id
   * @param {number}id 
   * @returns {Observable<any>}
   */
  getTransactionById(id: number, prodPkText: string): Observable<TransactionData[]> {
    return this._httpClient.post<TransactionData[]>(
      `${environment.serverOrigin}${TRANSACTIONS_ENDPOINT}`,
      JSON.stringify(transactionsData(id, this._storageService, this._languageService, prodPkText)), httpOptions)
      .pipe(
        take(1),
        shareReplay({ bufferSize: 1, refCount: true }),
        catchError((error) => {
          return this._errorHandlerService.handleErrorWithNavigationWithoutToats(error, SOMTHING_WENT_WRONG_ROUTE_PATH);
        }),
        tap((transaction: any) => {
          this._transaction.next(transaction);
        }));
  }

}

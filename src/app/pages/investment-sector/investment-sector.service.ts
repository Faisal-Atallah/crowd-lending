import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, shareReplay, take, tap } from 'rxjs';
import { httpOptions } from 'src/app/core/utils';
import { environment } from 'src/environments/environment';
import { INVESTMENT_SECTOR_ENDPOINT } from './investment-sector.constants';
import { investmentSectorData } from './investment-sector.data';
import { StorageService } from 'src/app/core/helpers/storage';
import { ErrorHandlerService } from 'src/app/core/errors/error-handler.service';
import { SOMTHING_WENT_WRONG_ROUTE_PATH } from '../error/something-went-wrong';
import { LanguageService } from 'src/app/core/language';

@Injectable({
  providedIn: 'root'
})
export class InvestmentSectorService {

  private _investmentSector: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _investmentSectors: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>([]);


  constructor(
    private _httpClient: HttpClient,
    private _storageService: StorageService,
    private _errorHandlerService: ErrorHandlerService,
    private _languageService: LanguageService
  ) { }

  get investmentSector$(): Observable<any> {
    return this._investmentSector.asObservable();
  }

  get investmentSectors$(): Observable<any[] | null> {
    return this._investmentSectors.asObservable();
  }


  /**
   * Get Investment Sector By Id
   * @param {number} id 
   * @returns {Observable<any>}
   */
  getInvestmentSectorById(id: number): Observable<any> {
    return this._httpClient.post<any>(`${environment.serverOrigin}${INVESTMENT_SECTOR_ENDPOINT}`,
      JSON.stringify(investmentSectorData(id, this._storageService, this._languageService)), httpOptions)
      .pipe(
        take(1),
        shareReplay({ bufferSize: 1, refCount: true }),
        catchError((error) => {
          return this._errorHandlerService.handleErrorWithNavigationWithoutToats(error, SOMTHING_WENT_WRONG_ROUTE_PATH);
        }),
        tap((investmentSector) => {
          this._investmentSector.next(investmentSector[0]);
        }));
  }

}

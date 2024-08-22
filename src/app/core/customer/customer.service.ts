import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { StorageService } from '../helpers/storage';
import { CUSTOMER_DATA } from './customer.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _customer: ReplaySubject<any | null> = new ReplaySubject<any | null>(1);

  /**
   * Constructor
   */
  constructor(
    private _storageService: StorageService
  ) {
    const customer: any | any = this._storageService.getData(CUSTOMER_DATA);
    if (customer) {
      this._customer.next(customer);
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for customer
   *
   * @param value
   */
  set customer(value: any) {
    this._storageService.saveData(CUSTOMER_DATA, value);
    this._customer.next(value);
  }

  get customer$(): Observable<any> {
    return this._customer.asObservable();
  }
}

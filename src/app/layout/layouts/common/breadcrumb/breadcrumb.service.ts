import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Breadcrumb } from './breadcrumb.types';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private _breadcrumb: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject<Breadcrumb[]>([]);


  set breadcrumb(value: Breadcrumb[]) {
    this._breadcrumb.next(value)
  }

  get breadcrumb$(): Observable<Breadcrumb[]> {
    return this._breadcrumb.asObservable();
  }
}

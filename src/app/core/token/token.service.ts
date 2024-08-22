import { Injectable } from '@angular/core';
import { StorageService } from '../helpers/storage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private _storageService: StorageService) { }


  /**
  * Setter & getter for access token
  */
  set accessToken(token: string) {
    this._storageService.saveData('accessToken', token);
  }

  get accessToken(): any {
    return this._storageService.getData('accessToken');
  }
}

import { Injectable } from '@angular/core';
import { StorageService } from '../helpers/storage';
import { LANGUAGE_DATA } from './language.constants';
import { Language } from 'src/app/pages/settings/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private _storageService: StorageService) { }

  /**
  * Setter & getter for language
  * @param {Language} value
  */
  set activeLang(value: Language) {
    const activeLange = { id: value.id, name: value.name }
    this._storageService.saveData(LANGUAGE_DATA, activeLange);
  }


  get activeLang(): any {
    return this._storageService.getData(LANGUAGE_DATA);
  }
}

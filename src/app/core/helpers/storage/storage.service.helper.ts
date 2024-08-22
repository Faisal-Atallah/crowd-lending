import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  /**
   * Save Data
   * @param {string}key
   * @param {any}value
   * @returns {void}
   */
  public saveData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get Data
   * @param {string}key
   * @returns {string | null}
   */
  getData(key: string): string | null {
    return JSON.parse(localStorage.getItem(key)!);
  }

  /**
   * Remove Data
   * @param {string}key
   * @returns {void}
   */
  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear Data
   * @returns {void}
   */
  clearData(): void {
    localStorage.clear();
  }

  /**
   * Is Storage Item Existent
   * @param {string}key
   * @returns {boolean}
   */
  isStorageItemExistent(key: string): boolean {
    if (key in localStorage) {
      return true;
    } else {
      return false;
    }
  }
}

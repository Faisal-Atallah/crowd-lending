import { Injectable } from '@angular/core';
import { showSuccessToast } from '../utils';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SuccessHandlerService {

  constructor(
    private _messageService: MessageService
  ) { }


  /**
   * Handle Success
   * @param {string} message 
   */
  handleSuccess(message: string): void {
    showSuccessToast(
      message,
      'successful', this._messageService
    );
  }

}

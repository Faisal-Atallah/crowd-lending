import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletSaveWithUsDialogComponent } from './save-with-us';
import { Router } from '@angular/router';
import { INVEST_ROUTE_PATH } from '../../invest';
import { WalletInviteDialogComponent } from './invite';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wallet-options',
  standalone: true,
  imports: [
    CommonModule,
    WalletSaveWithUsDialogComponent,
    WalletInviteDialogComponent,
    TranslateModule
  ],
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletOptionsComponent {
  isSaveWithUsDialogVisibile: boolean = false;
  isInviteDialogVisibile: boolean = false;
  constructor(private _router: Router) {

  }

  /**
   * Open Save WithUs Form Dialog 
   */
  openSaveWithUsFormDialog(): void {
    this.isSaveWithUsDialogVisibile = true;
  }

  /**
   * Close Save WithUs Form Dialog
   * @param {boolean}isClose 
   */
  closeSaveWithUsFormDialog(isClose: boolean): void {
    this.isSaveWithUsDialogVisibile = isClose;
  }

  /**
   * Open Invite Dialog
   */
  openInviteDialog(): void {
    this.isInviteDialogVisibile = true;
  }

  /**
   * Close Invite Dialog
   * @param {boolean}isClose 
   */
  closeInviteDialog(isClose: boolean): void {
    this.isInviteDialogVisibile = isClose;
  }

  /**
   * Navigate To Invest
   */
  navigateToInvest(): void {
    this._router.navigate([INVEST_ROUTE_PATH])
  }
}

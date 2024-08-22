import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { WalletAddMoneyDialogComponent } from './add-money';
import { ConfirmAddMoneyDialogComponent } from './add-money/confirm';
import { WalletWithdrawDialogComponent } from './withdraw';
import { WalletService } from '../wallet.service';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { Wallet } from '../wallet.types';
import { NO_ENOUGH_BALANCE } from '../wallet.constants';
import { WithdrawFailedDialogComponent } from './withdraw/failed';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wallet-balance',
  standalone: true,
  imports: [CommonModule,
    PrimeNgModule,
    WalletAddMoneyDialogComponent,
    ConfirmAddMoneyDialogComponent,
    WalletWithdrawDialogComponent,
    WithdrawFailedDialogComponent,
    TranslateModule
  ],
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletBalanceComponent implements OnInit, OnDestroy {
  walletBallance: number;
  isAddMoneyDialogVisibile: boolean = false;
  isConfirmAddMoneyDialogVisibile: boolean = false;
  isWithdrawDialogVisibile: boolean = false;
  isWithdrawFaildDialogVisible: boolean = false;
  walletData: Wallet;
  private _unsubscribeAll: Subject<void> = new Subject<void>;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _walletService: WalletService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _messageService: MessageService,
  ) {
    let htmlTag = this._document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    // htmlTag.dir = "rtl";
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._getWalletBalance();
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }

  /**
   * Get Wallet Balance
   */
  private _getWalletBalance(): void {
    this._walletService.walletBalance$.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((walletBalance) => {
        this.walletBallance = walletBalance;
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
   * Withdraw Wallet Amount
   * @param {Wallet}walletData 
   */
  withdrawWalletBalance(walletData: Wallet): void {
    this._walletService
      .withdrawWalletBalance(walletData)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
      },
        error => {
          if (error.error.text === NO_ENOUGH_BALANCE) {
            this.isWithdrawFaildDialogVisible = true
            this.openWithdrawFaildDialog();
          }
          this._changeDetectorRef.markForCheck();
        }
      );
  }

  /**
   * Add Money To Wallet
   * @param {Wallet} wallet 
   */
  addMoneyToWallet(wallet: Wallet): void {
    this.openConfirmAddMoneyDialog(wallet);
  }


  /**
   * Open Add Money Dialog
   */
  openAddMoneyDialog(): void {
    this.isAddMoneyDialogVisibile = true;
  }

  /**
   * Close Add Money Dialog
   * @param {boolean}isClose 
   */
  closeAddMoneyDialog(isClose: boolean): void {
    this.isAddMoneyDialogVisibile = isClose;
  }

  /**
   * Open Confirm Add Money Dialog
   */
  openConfirmAddMoneyDialog(walletData: Wallet): void {
    this.isConfirmAddMoneyDialogVisibile = true;
    this.walletData = walletData;
  }

  /**
   * Close Confirm Add Money Dialog
   * @param {boolean}isClose 
   */
  closeConfirmAddMoneyDialog(isClose: boolean): void {
    this.isConfirmAddMoneyDialogVisibile = isClose;
  }


  /**
   * Open Withdraw Dialog
   */
  openWithdrawDialog(): void {
    this.isWithdrawDialogVisibile = true;
  }

  /**
  * Close Withdrwa Dialog
  * @param {boolean}isClose 
  */
  closeWithdrwaDialog(isClose: boolean): void {
    this.isWithdrawDialogVisibile = isClose;
  }

  /**
   * Open Withdraw Faild Dialog
   */
  openWithdrawFaildDialog(): void {
    this.isWithdrawFaildDialogVisible = true;
  }

  /**
 * Close Withdrwa Faild Dialog
 * @param {boolean}isClose 
 */
  closeWithdrwaFaildDialog(isClose: boolean): void {
    this.isWithdrawFaildDialogVisible = isClose;
  }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { WalletService } from '../../../wallet.service';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-add-money-dialog',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, TranslateModule],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmAddMoneyDialogComponent implements OnInit, OnDestroy {
  @Input() visible: boolean = false;
  @Input() walletData: any;
  @Output() onCloseDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onInvestClicked: EventEmitter<any> = new EventEmitter<any>();

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _walletService: WalletService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  /**
   * On Init
   */
  ngOnInit(): void {

  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }

  /** 
   * Confirm Add Money
   */
  confirmAddMoney(): void {
    this._walletService.addBalance(this.walletData)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
        this.closeDialog();
      });
  }

  /**
  * Hide Dialog
  */
  closeDialog(): void {
    this.visible = false;
    this.onCloseDialog.emit(false);
  }
}

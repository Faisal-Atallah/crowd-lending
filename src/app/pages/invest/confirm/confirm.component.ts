import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { InvestData } from '../invets.types';
import { InvestService } from '../invest.service';
import { unsubscribe } from 'src/app/core/utils';

@Component({
  selector: 'app-invest-confirm',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, TranslateModule],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestConfirmComponent implements OnInit, OnDestroy {
  @Input() visible: boolean = false;
  @Input() investData: InvestData;
  @Output() onCloseDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _unsubscribeAll: Subject<void> = new Subject<void>();


  constructor(
    private _investService: InvestService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  /**
   * On Init
   */
  ngOnInit(): void {
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll)
  }

  /**
   * Confirm Invest
   */
  confirmInvest(): void {
    this._investService.invest(this.investData)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
        this.closeDialog();
      })
  }


  /**
 * Hide Dialog
 */
  closeDialog(): void {
    this.visible = false;
    this.onCloseDialog.emit(false);
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WithdrawForm } from './withdraw.types';
import { TranslateModule } from '@ngx-translate/core';
import { Wallet } from '../../wallet.types';
import { User, UserService } from 'src/app/core/user';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';

@Component({
  selector: 'app-wallet-withdraw-dialog',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletWithdrawDialogComponent implements OnInit, OnDestroy {
  @Input() visible: boolean = false;
  @Output() onCloseDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onWithdrawClicked: EventEmitter<Wallet> = new EventEmitter<Wallet>();
  user: User;
  withdrawForm: FormGroup<WithdrawForm>;

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._getCurrentUser();
    this._createWithdrawForm();
  }

  /**
 * On Destroy
 */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }

  /**
  * Get Current User
  */
  private _getCurrentUser(): void {
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
   * Create withdraw Form
   */
  private _createWithdrawForm(): void {
    this.withdrawForm = this._formBuilder.group({
      amount: ['', Validators.required],
      phoneNumber: [{ value: this.user?.regMobileNumber, disabled: true }, Validators.required],
      userName: [{ value: this.user?.name, disabled: true }, Validators.required],
      pin: ['', Validators.required]
    });
  }


  /**
  * Hide Dialog
  */
  closeDialog(): void {
    this.visible = false;
    this.onCloseDialog.emit(false);
  }

  /**
   * Withdraw
   */
  withdraw(): void {
    if (this.withdrawForm.invalid) {
      return;
    }
    this.onWithdrawClicked.emit(this.withdrawForm.getRawValue());
    this.closeDialog();
  }
}

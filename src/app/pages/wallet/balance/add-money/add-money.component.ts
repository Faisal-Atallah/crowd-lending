import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddMoneyForm } from './add-money.types';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { TranslateModule } from '@ngx-translate/core';
import { User, UserService } from 'src/app/core/user';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { Wallet } from '../../wallet.types';

@Component({
  selector: 'app-walet-add-money-dialog',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletAddMoneyDialogComponent implements OnInit, OnDestroy {
  @Input() visible: boolean = false;
  @Output() onCloseDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSaveClicked: EventEmitter<Wallet> = new EventEmitter<Wallet>();

  user: User; 
  addMoneyForm: FormGroup<AddMoneyForm>;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._getCurrentUser();
    this._createAddMoneyForm();
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
   * Create Add Money Form
   */
  private _createAddMoneyForm(): void {
    this.addMoneyForm = this._formBuilder.group({
      amount: ['', [Validators.required]],
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
  * Save
  */
  save(): void {
    if (this.addMoneyForm.invalid) {
      return
    }
    this.onSaveClicked.emit(this.addMoneyForm.getRawValue());
    setTimeout(() => {
      this.closeDialog();
    },);
  }
}

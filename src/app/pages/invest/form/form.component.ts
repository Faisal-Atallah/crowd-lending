import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { Invest } from '../invets.types';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvestForm } from './form.types';
import { TranslateModule } from '@ngx-translate/core';
import { User, UserService } from 'src/app/core/user';
import { Subject, takeUntil } from 'rxjs';
import { InvestService } from '../invest.service';
import { AmountValidator } from '../amount.validator';
import { FormCardComponent } from './card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invest-form',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    TranslateModule,
    FormCardComponent
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestFormComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() onCloseDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onInvestClicked: EventEmitter<any> = new EventEmitter<any>();

  @Input() invest: Invest;
  user: User;
  investForm: FormGroup<InvestForm>;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _investService: InvestService,
    private _router: Router
  ) {

  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._getCurrentUser();
    this._createInvestForm();
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
   * Create Invest Form
   */
  private _createInvestForm(): void {
    this.investForm = this._formBuilder.group({
      amount: ['', [Validators.required], [AmountValidator.createValidator(this._investService)]],
      phoneNumber: [{ value: this.user?.regMobileNumber, disabled: true }, Validators.required],
      customerName: [{ value: this.user?.name, disabled: true }, Validators.required],
      pin: ['', Validators.required],
      sysPkText: [this.invest.prodKey]
    })
  }

  /**
  * Hide Dialog
  */
  closeDialog(): void {
    this.visible = false;
    this.onCloseDialog.emit(false);
  }

  /**
   * On Invest
   */
  onInvest(): void {
    if (this.investForm.invalid) {
      return
    }
    this.onInvestClicked.emit(this.investForm.getRawValue());
    setTimeout(() => {
      this.closeDialog();
    },);
  }

  /**
   * Go To Investment Details
   * @param {number} sectorId 
   * @param {string} prodKey 
   */
  goToInvestmentDetails(sectorId: number, prodKey: string): void {
    this._router.navigateByUrl(`invest/${sectorId}/${prodKey}`);
  }
}

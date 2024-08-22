import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpForm } from './sign-up.types';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { AuthService } from 'src/app/core/auth';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { StringOnlyDirectiveModule } from 'src/app/shared/directives/string-only-input';
import { NumberOnlyDirectiveModule } from 'src/app/shared/directives/number-only-input';
import { MustMatch } from 'src/app/core/helpers/validations/must-match';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    StringOnlyDirectiveModule,
    NumberOnlyDirectiveModule,
    TranslateModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit, OnDestroy {
  @Output() onNavigateToSignIn: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  signUpForm: FormGroup<SignUpForm>
  formSubmitted: boolean = false;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._createSignUpForm();
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }


  /**
   * Create Sign Up Form
   */
  private _createSignUpForm(): void {
    this.signUpForm = this._formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  /**
  * Create User
  */
  private _createUser(): void {
    this._authService.signUp(this.signUpForm.getRawValue())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onNavigateToSignIn.emit(true);
        this.signUpForm.reset();
        this._changeDetectorRef.markForCheck();
      })
  }

  /**
  * Sign Up
  */
  signUp(): void {
    this.formSubmitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this._createUser();
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from './login.types';
import { AuthService } from 'src/app/core/auth';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup<LoginForm>;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _formBuilder: FormBuilder,
    public authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    // let htmlTag = this._document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    // htmlTag.dir = "rtl";
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._createLoginForm();
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }

  /**
   * Create Login Form
   */
  private _createLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [
        Validators.required, Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: ['', Validators.required]
    })
  }

  /**
   * Sign In
   */
  signIn(): void {

    if (this.loginForm.invalid) {
      return
    }
    this.authService.signIn(this.loginForm.getRawValue())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this._changeDetectorRef.markForCheck();
      }
      );
  }

}

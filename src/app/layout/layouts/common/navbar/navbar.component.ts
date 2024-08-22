import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { AuthDialogComponent } from 'src/app/partials/auth/auth-dialog';
import { RouterLink } from '@angular/router';
import { HttpLoadingService } from 'src/app/shared/services/http-loading';
import { AuthService } from 'src/app/core/auth';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, RouterLink, AuthDialogComponent, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {
  authDialogVisible: boolean = false;
  activeIndex: number | null;
  httpLoading: boolean = false;
  isAuthenticated: boolean;

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _httpLoadingService: HttpLoadingService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _authService: AuthService
  ) {
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._showHttpLoading();
    this._isUserAuthenticated();
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }

  /**
   * Sign Out
   */
  signOut(): void {
    this._authService.signOut()
      .subscribe(() =>{
        this._changeDetectorRef.markForCheck();
      })
  }

  /**
   * Open Auth Dialog
   * @param {number}activeIndex 
   */
  openAuthDialog(activeIndex: number): void {
    this.authDialogVisible = true;
    this.activeIndex = activeIndex;
    this._changeDetectorRef.markForCheck();
  }

  /**
  * Close Auth Dialog
  * @param {boolean}isVisibile 
  */
  closeAuthDialog(isVisibile: boolean): void {
    this.authDialogVisible = isVisibile;
    this.activeIndex = null;
    this._changeDetectorRef.markForCheck();
  }

   /**
  * Is User Authenticated
  */
  private _isUserAuthenticated(): void {
    this._authService.isAccessAllowed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        this._changeDetectorRef.markForCheck()
      });
  }

  /**
    * Show Http Loading
    */
  private _showHttpLoading(): void {
    this._httpLoadingService.httpProgress()
      .subscribe((status: boolean) => {
        if (status) {
          setTimeout(() => {
            this.httpLoading = true;
            this._changeDetectorRef.markForCheck();
          }, 0);
        } else {
          setTimeout(() => {
            this.httpLoading = false;
            this._changeDetectorRef.markForCheck();
          }, 1000);
        }
      });
  }
}

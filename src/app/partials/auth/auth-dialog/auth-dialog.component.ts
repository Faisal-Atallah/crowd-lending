import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { SignUpComponent } from '../sign-up';
import { LoginComponent } from '../login';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, SignUpComponent, LoginComponent, TranslateModule],
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthDialogComponent {
  @Input() visible: boolean = false;
  @Input() activeIndex: number | null;
  @Output() onCloseDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onUpdateActiveIndex: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) {
  }


  /**
   * Navigate To SignIn
   * @param {boolean}event 
   */
  navigateToSignIn(event: boolean): void {
    if (event === true) {
      this.activeIndex = 1;
    }
  }

  /**
  * Hide Dialog
  */
  closeDialog(): void {
    this.visible = false;
    this.activeIndex = null;
    this.onCloseDialog.emit(false);
    this._changeDetectorRef.markForCheck();
  }
}

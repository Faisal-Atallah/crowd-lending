import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wallet-invite-dialog',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, ClipboardModule, TranslateModule],
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletInviteDialogComponent {
  inviteCode = 'abcde123';
  @Input() visible: boolean = false;
  @Output() onCloseDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
  * Hide Dialog
  */
  closeDialog(): void {
    this.visible = false;
    this.onCloseDialog.emit(false);
  }
}

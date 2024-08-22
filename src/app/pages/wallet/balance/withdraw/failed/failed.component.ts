import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-withdraw-failed-dialog',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, TranslateModule],
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithdrawFailedDialogComponent {
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

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { Router } from '@angular/router';
import { Invest } from '../invets.types';
import { InvestDialogCardComponent } from './card/card.component';

@Component({
  selector: 'app-invest-dialog',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgModule,
    TranslateModule,
    InvestDialogCardComponent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestDialogComponent {
  @Input() visible: boolean = false;
  @Output() onCloseDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() invest: Invest;

  constructor(
    private _router: Router
  ) {

  }

  /**
   * On Init
   */
  ngOnInit(): void {
  }


  /**
  * Hide Dialog
  */
  closeDialog(): void {
    this.visible = false;
    this.onCloseDialog.emit(false);
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

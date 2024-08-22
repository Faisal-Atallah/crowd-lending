import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invest, InvestData } from '../../invets.types';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { InvestConfirmComponent } from '../../confirm';
import { InvestFormComponent } from '../../form';
import { TranslateModule } from '@ngx-translate/core';
import { InvestDialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-invest-list-card',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgModule,
    InvestFormComponent,
    InvestConfirmComponent,
    TranslateModule,
    InvestDialogComponent
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestListCardComponent {

  isInvestFormVisibile: boolean = false;
  isConfirmInvestVisibile: boolean = false;
  investData: InvestData;
  @Input() invest: Invest;

  constructor() {
  }


  /**
   * On Invest
   * @param {InvestData}investData 
   */
  onInvest(investData: InvestData): void {
    this.openConfirmInvestDialog(investData);
  }

  /**
  * Open Invest Form Dialog
  * @param {Invest} invest 
  */
  openInvestFormDialog(invest: Invest): void {
    this.invest = invest;
    this.isInvestFormVisibile = true;
  }

  /**
   * Close Invest Form Dialog
   * @param {boolean}isClose 
   */
  closeInvestFormDialog(isClose: boolean): void {
    this.isInvestFormVisibile = isClose;
  }


  /**
   * Open Confirm Invest Dialog
   * @param {InvestData}investData 
   */
  openConfirmInvestDialog(investData: InvestData): void {
    this.investData = investData;
    this.isConfirmInvestVisibile = true;
  }

  /**
   * Close Confirm Invest Dialog
   * @param {boolean}isClose 
   */
  closeConfirmInvestDialog(isClose: boolean): void {
    this.isConfirmInvestVisibile = isClose;
  }


}

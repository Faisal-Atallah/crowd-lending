import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { InvestmentDetailsService } from './investment-details.service';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { TranslateModule } from '@ngx-translate/core';
import { SafePipe } from 'src/app/shared/pipes/safe/safe.pipe';
import { InvestListCardComponent } from '../invest/list/card';
import { InvestFormComponent } from '../invest/form';
import { InvestConfirmComponent } from '../invest/confirm';

@Component({
  selector: 'app-investment-details',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, TranslateModule, SafePipe, InvestListCardComponent, InvestFormComponent, InvestConfirmComponent],
  templateUrl: './investment-details.component.html',
  styleUrl: './investment-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentDetailsComponent implements OnInit, OnDestroy {
  investmentDetails: any;
  relatedProjects: any[];
  isInvestFormVisibile: boolean = false;
  isConfirmInvestVisibile: boolean = false;
  invest: any;
  investData: any;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _investmentDetailsService: InvestmentDetailsService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }


  /**
   * On Init
   */
  ngOnInit(): void {
    this._getInvestmentDetails();
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }

  /**
   * Get Investment Details
   */
  private _getInvestmentDetails(): void {
    this._investmentDetailsService.investmentDetaisl$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((invetsmentDetails) => {
        this.investmentDetails = invetsmentDetails.investmentsMoreDetails[0];
        this.relatedProjects = invetsmentDetails.relatedProjectsRespList;
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
 * On Invest
 * @param {InvestData}investData 
 */
  onInvest(investData: any): void {
    this.openConfirmInvestDialog(investData);
  }

  /**
  * Open Invest Form Dialog
  * @param {Invest} invest 
  */
  openInvestFormDialog(invest: any): void {
    this.invest = invest;
    console.log(invest);
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
  openConfirmInvestDialog(investData: any): void {
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

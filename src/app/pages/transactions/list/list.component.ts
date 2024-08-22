import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TransactionsService } from '../transactions.service';
import { BreadcrumbService } from 'src/app/layout/layouts/common/breadcrumb';
import { unsubscribe } from 'src/app/core/utils';
import { InvestmentCardComponent } from 'src/app/widget/investment-card';
import { MobileInvestmentCardComponent } from 'src/app/widget/mobile-investment-card/mobile-investment-card.component';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { TransactionsListTableComponent } from './table';
import { TransactionData } from '../transactions.types';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgModule,
    InvestmentCardComponent,
    MobileInvestmentCardComponent,
    TransactionsListTableComponent,
    TranslateModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  transaction: TransactionData;
  investment: any;
  private _unsubscribeAll: Subject<void> = new Subject<void>;

  constructor(
    private _transactionsService: TransactionsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _breadcrumbService: BreadcrumbService,
    private _translateService: TranslateService
  ) {
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._getTransaction();
    this._getInvestmentDetails();
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
    this._breadcrumbService.breadcrumb = [];
  }

  /**
   * Get Transaction
   */
  private _getTransaction(): void {
    this._transactionsService.transaction$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((transaction) => {
        this.transaction = transaction;
        this._setBreadcrumb(transaction?.sectorName, transaction?.sectorId, transaction?.title, transaction?.id)
        this._changeDetectorRef.markForCheck();
      });
  }

  // toDo get sector name sector id

  /**
   * Get Investment Details
   */
  private _getInvestmentDetails(): void {
    this._transactionsService.investment$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((investment) => {
        this.investment = investment;
        this._changeDetectorRef.markForCheck();
      })
  }

  /**
  * Set Breadcrumb
  * @param {string}label 
  * @param {string}routerLink 
  */
  private _setBreadcrumb(parentLabel: string, parentRouterLink: string, label: string, routerLink: number): void {
    this._breadcrumbService.breadcrumb = [
      {
        img: 'assets/images/icons/home.svg',
        label: this._translateService.instant('home'),
        routerLink: '/'
      },
      {
        icon: this._getArrowIconBasedOnLanguage()
      },
      {
        label: this._translateService.instant('my-portfolio'),
        routerLink: 'portfolio'
      },
      {
        icon: parentLabel ? this._getArrowIconBasedOnLanguage() : ''
      },
      {
        label: parentLabel,
        routerLink: `portfolio/${parentRouterLink}`
      },
      {
        icon: label ? this._getArrowIconBasedOnLanguage() : ''
      },
      {
        label: label,
        routerLink: `portfolio/${parentRouterLink}/${routerLink}`
      },
    ]
  }

  /**
   * Get Arrow Icon Based On Language
   * @returns {string}
   */
  private _getArrowIconBasedOnLanguage(): string {
    const currentLang = this._translateService.currentLang;
    return currentLang === "ar" ? "assets/images/icons/arrow-left.svg" : "assets/images/icons/arrow-right.svg";
  }

}

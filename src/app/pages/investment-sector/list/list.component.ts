import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from 'src/app/layout/layouts/common/breadcrumb';
import { InvestmentSectorService } from '../investment-sector.service';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { InvestmentSectorDetailsComponent } from './details/details.component';
import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InvestmentCardComponent } from 'src/app/widget/investment-card';
import { MobileInvestmentCardComponent } from 'src/app/widget/mobile-investment-card/mobile-investment-card.component';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TransactionsService } from '../../transactions';

@Component({
  selector: 'app-investment-sector-list',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgModule,
    InvestmentSectorDetailsComponent,
    FormsModule,
    InvestmentCardComponent,
    MobileInvestmentCardComponent,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentSectorListComponent implements OnInit, OnDestroy {
  investmentSector: any;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  sortOptions: SelectItem[] = [
    { label: this._translateService.instant('investment-amount'), value: this._translateService.instant('investment-amount') },
    { label: this._translateService.instant('roi'), value: this._translateService.instant('roi') },
    { label: this._translateService.instant('investment-remaining'), value: this._translateService.instant('investment-remaining') }
  ];

  sortField: string = '';

  constructor(
    private _breadcrumbService: BreadcrumbService,
    private _investmentSectorService: InvestmentSectorService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _translateService: TranslateService,
    private _transactionsService: TransactionsService
  ) {
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._getInvestmentSector();
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
    this._breadcrumbService.breadcrumb = [];
  }

  /**
   * Get Investment Sector
   */
  private _getInvestmentSector(): void {
    this._investmentSectorService.investmentSector$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(investmentSector => {
        this.investmentSector = investmentSector;
        this._setBreadcrumb(investmentSector.sectorName, investmentSector.id);
        this._changeDetectorRef.markForCheck();
      });
  }

  /** 
  * Filter Investments Sectors
  * @param {Table}table 
  * @param {Event}event 
  */
  filterInvestmentsSectors(dataView: DataView, event: Event): void {
    dataView.filter((event.target as HTMLInputElement).value, 'contains');
  }

  /**
   * On Sort Change
   * @param {any}event 
   */
  onSortChange(event: any): void {
    switch (event.value) {
      case this._translateService.instant('roi'):
        this._sortInvestments('roi');
        break;
      case this._translateService.instant('investment-amount'):
        this._sortInvestments('investmentAmount');
        break;
      case this._translateService.instant('investment-remaining'):
        this._sortInvestments('investmentRemaining');
        break;
      default:
        break;
    }
  }


  /**
   * Set Invetment
   * @param {any} investment 
   */
  setInvetment(investment: any): void {
    this._transactionsService.investment = investment;
  }


  /**
   * Sort Investments
   * @param {string | number} sortBy 
   */
  private _sortInvestments(sortBy: string | number): void {
    this.investmentSector.investments = [...this.investmentSector.investments.sort((a: any, b: any) => (a[sortBy] > b[sortBy]) ? -1 : 1)];
    this._changeDetectorRef.markForCheck()
  }

  /**
   * Set Breadcrumb
   * @param {string}label 
   * @param {string}routerLink 
   */
  private _setBreadcrumb(label: string, routerLink: number): void {
    this._breadcrumbService.breadcrumb = [
      {
        img: 'assets/images/icons/home.svg',
        label: this._translateService.instant('home'),
        routerLink: '/'
      },
      {
        icon: this._getArrowIconBasedOnLanguage(),
        label: ''
      },
      {
        icon: '',
        label: this._translateService.instant('my-portfolio'),
        routerLink: 'portfolio'
      },
      {
        icon: this._getArrowIconBasedOnLanguage(),
        label: ''
      },
      {
        icon: '',
        label: label,
        routerLink: `portfolio/${routerLink}`
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

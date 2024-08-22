import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioChartComponent } from '../chart';
import { PortfolioService } from '../portfolio.service';
import { Portfolio } from '../portfolio.types';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { PortfolioBalanceComponent } from '../balance/balance.component';
import { PortfolioCategoriesComponent } from '../categories/categories.component';
import { BreadcrumbService } from 'src/app/layout/layouts/common/breadcrumb';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio-items',
  standalone: true,
  imports: [CommonModule, PortfolioChartComponent, PortfolioBalanceComponent, PortfolioCategoriesComponent],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioItemsComponent implements OnInit, OnDestroy {

  portfolio: Portfolio[];

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _portofolioService: PortfolioService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _breadcrumbService: BreadcrumbService,
    private _translateService: TranslateService
  ) {
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._setBreadcrumb();
    this._getPortofolio();
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }


  /**
   * Get Portofolio
   */
  private _getPortofolio(): void {
    this._portofolioService.portfolio$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((portofolio: any | null) => {
        this.portfolio = portofolio[0];
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
  * Set Breadcrumb
  */
  private _setBreadcrumb(): void {
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

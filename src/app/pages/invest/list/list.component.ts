import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestService } from '../invest.service';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';
import { Invest, SectorFilter } from '../invets.types';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { InvestListCardComponent } from './card';
import { SelectItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DataView } from 'primeng/dataview';
import { InvestFormComponent } from '../form';
import { InvestConfirmComponent } from '../confirm';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-invest-list',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgModule,
    InvestListCardComponent,
    FormsModule,
    InvestFormComponent,
    InvestConfirmComponent,
    TranslateModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestListComponent implements OnInit, OnDestroy {
  @ViewChild('dvInvestment') dv: DataView;
  investments: Invest[];
  investmentsCopy: Invest[];
  investment: Invest;
  isInvestFormVisibile: boolean = false;
  isConfirmInvestVisibile: boolean = false;
  sortField: string | undefined = '';
  sortOptions: SelectItem[] = [
    { label: this._translate.instant('high'), value: this._translate.instant('high') },
    { label: this._translate.instant('med'), value: this._translate.instant('Medium'), },
    { label: this._translate.instant('low'), value: this._translate.instant('low') }
  ];

  sortOrder!: number;
  sectorsOptions: any[] = [
    { label: this._translate.instant('all'), value: null }
  ];
  selectedSector: string | undefined;

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _investService: InvestService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _translate: TranslateService
  ) { }


  /**
   * On Init
   */
  ngOnInit(): void {
    this._getSectorsFilter();
    this._getInvestments();
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }

  /**
   * Get Investments
   */
  private _getInvestments(): void {
    this._investService.investments$.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((invests: Invest[]) => {
        this.investments = invests;
        this.investmentsCopy = invests;
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
   * Get Sectors Filter
   */
  private _getSectorsFilter(): void {
    this._investService.sectors$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((sectors: SectorFilter[]) => {
        this.sectorsOptions = this.sectorsOptions.concat(sectors);
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
   * On Sector Change
   * @param {any}event 
   */
  onSectorChange(event: any): void {
    this.investments = this.investmentsCopy
    const value = event?.value?.value;
    if (value) {
      const filteredItems = this.investments.filter((invest) => {
        return invest.sector == value;
      });
      this.investments = filteredItems;
      this._changeDetectorRef.markForCheck()
    }
  }

  /** 
  * Filter Investments
  * @param {Table}table 
  * @param {Event}event 
  */
  filterInvestments(dataView: DataView, event: Event): void {
    dataView.filter((event.target as HTMLInputElement).value, 'contains')
  }


  /**
   * On Grade Sort Change
   * @param {any}event 
   */
  onGradeSortChange(event: any): void {
    this.investments.sort((a: any, b: any) => (a.investmentGrade == event.value) ? -1 : 1);
    this._changeDetectorRef.markForCheck();
  }


}



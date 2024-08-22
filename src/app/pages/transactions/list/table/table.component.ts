import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { CustomDatePipe } from 'src/app/shared/pipes/date';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-transactions-list-table',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, CustomDatePipe, TranslateModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsListTableComponent implements OnInit {
  @Input({ required: true }) transactions: any;
  private _transactionsCopy: any;
  statuses: any[];
  selectedStatus = '';

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
    this._setStatusesDropDown();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._transformTransactionDate();
    this._transactionsCopy = this.transactions;
  }

  /**
   * Transform Transaction Date
   */
  private _transformTransactionDate(): void {
    this.transactions.map((transaction: any) => {
      transaction.date = new Date(transaction.date);
      this._changeDetectorRef.markForCheck();
    });
  }

  /**
   * Set Statuses Drop Down
   */
  private _setStatusesDropDown(): void {
    this.statuses = [
      { name: 'All', value: null },
      { name: 'Paid', value: 'Paid' },
      { name: 'unPaid', value: 'unPaid' }
    ];
  }

  /**
  * On Status Change
  * @param {any}event 
  */
  onStatusChange(event: any): void {
    this.transactions = this._transactionsCopy
    const value = event.value.value;
    if (value) {
      const filteredItems = this.transactions.filter((transaction: any) => {
        return transaction.status === value;
      });
      this.transactions = filteredItems;
      this._changeDetectorRef.markForCheck();
    }
  }

}

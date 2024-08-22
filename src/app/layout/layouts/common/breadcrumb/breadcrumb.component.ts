import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { Breadcrumb } from './breadcrumb.types';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/app/core/utils';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('listItem') listItems: QueryList<ElementRef>;

  items: Breadcrumb[];

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _breadcrumbService: BreadcrumbService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  /**
  * On Init
  */
  ngOnInit(): void {
    this._getBreadcrumb();
  }

  /**
   * After View Init 
   */
  ngAfterViewInit(): void {
    this.listItems.changes.subscribe(() => {
      // Get the last <li> element
      const lastLiElement = this.listItems.last;
      // Check if the lastLiElement exists before scrolling
      if (lastLiElement) {
        // Scroll to the last <li> element
        lastLiElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  }

  /**
  * On Destroy
  */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }


  /**
   * Get Breadcrumb
   */
  private _getBreadcrumb(): void {
    this._breadcrumbService.breadcrumb$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((items: Breadcrumb[]) => {
        setTimeout(() => {
          this.items = items;
          this._changeDetectorRef.markForCheck();
        },);
      });
  }

  /**
   * Track By
   * @param {number} index 
   * @param {any} item 
   * @returns {any}
   */
  trackBy(index: number, item: any): any {
    return item.id || index;
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyLayoutComponent } from './layouts/empty';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { HorizontalLayoutComponent } from './layouts/horizontal';
import { HorizontalWithBreadcrumbComponent } from './layouts/horizontal-with-breadcrumb';
import { LoadingIndicatorComponent, LoadingIndicatorService } from '../widget/loading-indicator';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from '../core/utils';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, 
    EmptyLayoutComponent, 
    HorizontalLayoutComponent, 
    HorizontalWithBreadcrumbComponent, 
    LoadingIndicatorComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [LoadingIndicatorService]
})
export class LayoutComponent implements OnInit, OnDestroy {

  layout: string;
  httpLoading: boolean = false;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    public loadingIndicatorService: LoadingIndicatorService,
    private _router: Router
  ) {
    this._subscribeToRouterEvents();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._showLoadingIndecator();
    this._updateLayout();
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }

  /**
  * Subscribe To Router Events
  */
  private _subscribeToRouterEvents(): void {
    this._router.events
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((routerEvent) => {
        this._checkRouterEvent(routerEvent as RouterEvent);
      });
  }

  /**
   * Check Router Event
   * @param {RouterEvent}routerEvent 
   */
  private _checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loadingIndicatorService.showLoadingIndicator();
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loadingIndicatorService.hideLoadingIndicator();
    }
  }

  /**
    * Show Loading Indecator
    */
  private _showLoadingIndecator(): void {
    this.loadingIndicatorService.showLoadingIndicator();
    setTimeout(() => {
      this.loadingIndicatorService.hideLoadingIndicator();
    }, 1000);
  }

  /**
   * Update the selected layout
   */
  private _updateLayout(): void {
    // Get the current activated route
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      // Check if there is a 'layout' data
      if (path.routeConfig && path.routeConfig.data && path.routeConfig.data['layout']) {
        // Set the layout
        this.layout = path.routeConfig.data['layout'];
      }
    });
  }
}

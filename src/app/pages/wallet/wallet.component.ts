import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbService } from 'src/app/layout/layouts/common/breadcrumb';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent implements OnInit {

  constructor(
    private _breadcrumbService: BreadcrumbService,
    private _translateService: TranslateService
  ) {

  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._setBreadcrumb();
  }

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
        label: this._translateService.instant('my-wallet'),
        routerLink: 'my-wallet'
      },
    ];
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

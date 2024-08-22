import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNgModule } from './shared/modules/prime-ng';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './core/language';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, CommonModule, PrimeNgModule]
})
export class AppComponent {
  title = 'crowd-lending';
  constructor(
    private _translateService: TranslateService,
    @Inject(DOCUMENT) private _document: Document,
    private _languageService: LanguageService
  ) {
    const activeLang = this._languageService.activeLang?.name ? this._languageService.activeLang?.name : 'en';
    this._setActiveLang(activeLang);
  }

  /**
   * Set Active Lang
   * @param {Language}lang 
   */
  _setActiveLang(lang: string): void {
    this._translateService.use(lang);
    this.setLayoutDirection(lang);
  }

  /**
   * Set Layout Direction
   * @param {string}lang 
   */
  setLayoutDirection(lang: string): void {
    let htmlTag = this._document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
  }

}

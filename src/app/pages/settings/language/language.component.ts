import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Language } from './language.types';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { FormsModule } from '@angular/forms';
import { LanguageService } from 'src/app/core/language';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-language',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, FormsModule, TranslateModule],
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsLanguageComponent {
  languages: Language[];
  selectedLanguage: Language;

  constructor(
    private _languageService: LanguageService,
    private _translateService: TranslateService,
    @Inject(DOCUMENT) private _document: Document,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.languages = [{ id: 2, name: 'en' }, { id: 1, name: 'ar' }];
  }

  /**
  * Set the active lang
  * @param {Language}lang
  */
  setActiveLang(lang: Language): void {
    if (lang) {
      this._languageService.activeLang = lang;
      this._translateService.use(lang.name);
      this.setLayoutDirection(lang.name);
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Set Layout Direction
   * @param {string}lang 
   */
  setLayoutDirection(lang: string): void {
    let htmlTag = this._document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    this._changeDetectorRef.markForCheck();
  }
}

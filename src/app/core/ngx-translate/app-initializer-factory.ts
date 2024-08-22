import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOCATION_INITIALIZED } from '@angular/common';

export function TranslationAppInitializerFactory(translate: TranslateService, injector: Injector) {
    return async () => {
        await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

        const deaultLang = 'en';
        translate.addLangs(['en', 'ar']);
        translate.setDefaultLang(deaultLang);
        try {
            await translate.use(deaultLang).toPromise();
        } catch (err) {
            console.log(err);
        }
        console.log(`Successfully initialized ${deaultLang} language.`);
    };
}
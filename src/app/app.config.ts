import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, Injector, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { appRoutes } from './app.routes';
import { mockApiServices } from './mock-api';
import { provideCrowdLending } from 'projects';
import { provideServiceWorker } from '@angular/service-worker';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from './core/auth';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationAppInitializerFactory, createTranslateLoader } from './core/ngx-translate';
import { HttpLoadingInterceptor } from './core/interceptors/http-loading';


export const appConfig: ApplicationConfig = {

    providers: [
        importProvidersFrom(
            TranslateModule.forRoot({
                defaultLanguage: 'en',
                loader: {
                    provide: TranslateLoader,
                    useFactory: createTranslateLoader,
                    deps: [HttpClient],
                },
            })
        ),
        {
            provide: APP_INITIALIZER,
            useFactory: TranslationAppInitializerFactory,
            deps: [TranslateService, Injector],
            multi: true
        },
        MessageService,
        provideAnimations(),
        provideHttpClient(
            withInterceptorsFromDi(),
        ),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoadingInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        provideRouter(appRoutes, withPreloading(PreloadAllModules),
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
        provideCrowdLending({
            mockApi: {
                delay: 0,
                services: mockApiServices
            },
        }),
        provideServiceWorker('ngsw-worker.js', {
             enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        }),
    ]
};

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ENVIRONMENT_INITIALIZER, EnvironmentProviders, importProvidersFrom, inject, Provider } from '@angular/core';
import { MOCK_API_DEFAULT_DELAY } from './mock-api/src/public-api';
import { mockApiInterceptor } from './mock-api/src/lib/mock-api/mock-api.interceptor';


/**
 * Crowd Lending provider
 */
export const provideCrowdLending = (config: any): Array<Provider | EnvironmentProviders> => {
    // Base providers
    const providers: Array<Provider | EnvironmentProviders> = [
        {
            provide: MOCK_API_DEFAULT_DELAY,
            useValue: config?.mockApi?.delay ?? 0,
        }
    ];

    // Mock Api services
    if (config?.mockApi?.services) {
        providers.push(
            provideHttpClient(withInterceptors([mockApiInterceptor])),
            {
                provide: APP_INITIALIZER,
                deps: [...config.mockApi.services],
                useFactory: () => (): any => null,
                multi: true,
            },
        );
    }

    // Return the providers
    return providers;
};

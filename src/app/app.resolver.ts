import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from './core/auth';

export const initialDataResolver = () => {
    const authService = inject(AuthService);
    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
        authService.companySignIn()
    ]);
};

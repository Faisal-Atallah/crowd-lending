import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { InvestmentSectorService } from "./investment-sector.service";
import { catchError, throwError } from "rxjs";

/**
 * Investment Sector Resolver
 * @param {ActivatedRouteSnapshot} route 
 * @param {RouterStateSnapshot} state 
 * @returns 
 */
export const investmentSectorResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const investmentSectorService = inject(InvestmentSectorService);
    const router = inject(Router);

    return investmentSectorService.getInvestmentSectorById(Number(route.paramMap.get('id')))
        .pipe(
            // Error here means the requested contact is not available
            catchError((error) => {
                // Log the error
                console.error(error);

                // Get the parent url
                const parentUrl = state.url.split('/').slice(0, -1).join('/');

                // Navigate to there
                router.navigateByUrl(parentUrl);

                // Throw an error
                return throwError(error);
            }),
        );
};
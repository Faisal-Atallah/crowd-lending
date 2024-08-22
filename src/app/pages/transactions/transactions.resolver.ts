import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { TransactionsService } from "./transactions.service";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";

/**
 * Investment Sector Resolver
 * @param {ActivatedRouteSnapshot} route 
 * @param {RouterStateSnapshot} state 
 * @returns 
 */
export const transactionResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const transactionsService = inject(TransactionsService);
    const router = inject(Router);
    return transactionsService.getTransactionById(Number(route.paramMap.get('id')), route.paramMap.get('prodPkText') as string)
        .pipe(
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
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NEVER, Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpLoadingService } from 'src/app/shared/services/http-loading';
import { HttpInterceptorFn } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class HttpLoadingInterceptor implements HttpInterceptor {

    private count = 0;

    constructor(private _loadingService: HttpLoadingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.count === 0) {
            this._loadingService.setHttpProgressStatus(true);
        }
        this.count++;
        return next.handle(req).pipe(
            catchError((error) => {
                this._loadingService.setHttpProgressStatus(false);
                return throwError(error)
            }),
            finalize(() => {
                this.count--;
                if (this.count === 0) {
                    this._loadingService.setHttpProgressStatus(false);
                }
            }));
    }
}

// const httpLoadingService: HttpLoadingService = Inject(HttpLoadingService);;
// export const HttpLoadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
//     let count = 0;

//     if (count === 0) {
//         httpLoadingService?.setHttpProgressStatus(true);
//     }
//     return next(req).pipe(
//         finalize(() => {
//             count--;
//             if (count === 0) {
//                 httpLoadingService?.setHttpProgressStatus(false);
//             }
//         }));
// }

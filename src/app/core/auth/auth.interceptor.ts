import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { TokenService } from '../token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this._tokenService.accessToken;

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });

        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}
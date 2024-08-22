import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user';
import { BehaviorSubject, Observable, catchError, of, shareReplay, take, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { httpOptions } from '../utils';
import { StorageService } from '../helpers/storage';
import { AUTH_DATA, SIGN_IN_ENDPOINT, SIGN_UP_ENDPOINT } from './auth.constants';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../errors/error-handler.service';
import { SuccessHandlerService } from '../success';
import { TokenService } from '../token';
import { SignUpData } from 'src/app/partials/auth/sign-up';
import { companyData, signInData, signUpData } from './auth.data';
import { SignInData } from 'src/app/partials/auth/login';
import { PORTFOLIO_ROUTE_PATH } from 'src/app/pages/portfolio';
import { CUSTOMER_DATA, CUSTOMER_INFO_END_POINT, Customer, CustomerService } from '../customer';
import { SOMTHING_WENT_WRONG_ROUTE_PATH } from 'src/app/pages/error/something-went-wrong';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private readonly _invalidCredentials: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private readonly _isUserAlreadyExist: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isUserAlreadyExist$(): Observable<boolean> {
        return this._isUserAlreadyExist.asObservable();
    }

    get invalidCredentials$(): Observable<boolean> {
        return this._invalidCredentials.asObservable();
    }

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _storageService: StorageService,
        private _router: Router,
        private _tokenService: TokenService,
        private _errorHandlerService: ErrorHandlerService,
        private _successHandlerService: SuccessHandlerService,
        private _customerService: CustomerService
    ) {
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        this._storageService.removeData(AUTH_DATA);

        this._storageService.removeData(CUSTOMER_DATA);

        // Set the authenticated flag to false
        this._authenticated = false;

        this._router.navigateByUrl('/home');

        location.reload();

        // Return the observable
        return of(true);
    }

    /**
     * Company SignIn
     * @returns {Observable<any>}
     */
    companySignIn(): Observable<any> {
        return this._httpClient.post(`${environment.platformServerOrigin}${SIGN_IN_ENDPOINT}`, companyData, httpOptions).pipe(
            shareReplay({ bufferSize: 1, refCount: true }),
            catchError((error) => {
                return this._errorHandlerService.handleErrorWithNavigationWithoutToats(error, SOMTHING_WENT_WRONG_ROUTE_PATH);
            }),
            tap((response: any) => {
                this._tokenService.accessToken = response.jwt.access_token;
            })
        )
    }

    /**
     * Get Customer Info
     * @param {string} id 
     * @returns Observable<any>
     */
    getCustomerInfo(id: string): Observable<Customer> {
        return this._httpClient.post<Customer>(`${environment.serverOrigin}${CUSTOMER_INFO_END_POINT}`, { "xapUserId": id }, httpOptions)
            .pipe(
                take(1),
                shareReplay({ bufferSize: 1, refCount: true }),
                tap((customer: Customer) => {
                    this._customerService.customer = customer;
                })
            )
    }

    /**
    * Sign in
    * @param {SignInData} credentials
    */
    signIn(credentials: SignInData): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${environment.platformServerOrigin}${SIGN_IN_ENDPOINT}`, JSON.stringify(signInData(credentials)), httpOptions)
            .pipe(
                take(1),
                // shareReplay({ bufferSize: 1, refCount: true }),
                catchError(error => {
                    if (error.error.code === 400 || error.error.message === "Failed to authenticate user with 'password'. Check if user is active.") {
                        this._invalidCredentials.next(true);
                        return throwError(error);
                    }
                    return throwError(error);
                }),
                tap((response: any) => {
                    this._userService.user = response.user;
                    this.getCustomerInfo(response.user.id).subscribe()
                    this._router.navigate([PORTFOLIO_ROUTE_PATH]);
                })
            );
    }

    /**
    * Sign up
    * @param {SignUpData} user
    */
    signUp(user: SignUpData): Observable<any> {
        return this._httpClient.post(`${environment.platformServerOrigin}${SIGN_UP_ENDPOINT}`, signUpData(user))
            .pipe(
                take(1),
                shareReplay({ bufferSize: 1, refCount: true }),
                catchError((error) => {
                    if (error.error.code === 400 || error.error.message === "User already exist") {
                        this._isUserAlreadyExist.next(true);
                        return throwError(error);
                    }
                    return throwError(error);
                }),
                tap((response: any) => {
                    if (response.active) {
                        return of([true]);
                    }
                    return of([true]);
                }),
            );
    }


    /**
    * Is Access Allowed
    * @returns {Observable<boolean>}
    */
    isAccessAllowed(): Observable<boolean> {
        return this._storageService.getData(AUTH_DATA) !== 'null' &&
            this._storageService.isStorageItemExistent(AUTH_DATA)
            ? of(true)
            : of(false);
    }
}

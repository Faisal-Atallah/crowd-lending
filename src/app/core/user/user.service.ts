import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map } from 'rxjs';
import { AUTH_DATA } from '../auth/auth.constants';
import { StorageService } from '../helpers/storage';
import { User } from './user.types';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _user: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;
    /**
     * Constructor
     */
    constructor(
        private _storageService: StorageService
    ) {
        const user: User | any = this._storageService.getData(AUTH_DATA);
        if (user) {
            this._user.next(user);
        }        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        this._storageService.saveData(AUTH_DATA, value);
        this._user.next(value);
    }

    get user$(): Observable<User | any> {
        return this._user.asObservable();
    }
}

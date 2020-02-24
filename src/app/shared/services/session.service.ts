import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../constants/app-constants';
import { User } from '../models/User';
import { UtilsService } from './utils.service';
import { ENUM_ROLES, ROLES } from '../constants/enum-constants';


@Injectable()
export class SessionService {

    constructor(private _utilService: UtilsService) {
    }

    saveCompleteUser(user: User) {
        localStorage.setItem(APP_CONSTANTS.FIELD_USER_DETAILS, JSON.stringify(user));
    }

    getUser(): User {
        const userString = window.sessionStorage[APP_CONSTANTS.FIELD_USER_DETAILS];
        let user: User;
        if (userString) {
            user = JSON.parse(userString);
        }
        return user;
    }

    destroyCompleteUser() {
        return window.sessionStorage.removeItem('mccray_user');
    }

    get(item: string): string {
        return window.sessionStorage[item];
    }

    save(item: string, value: string) {
        window.sessionStorage[item] = value;
    }

    destroy() {
        localStorage.clear();
    }

    isSeller() {
        return this._utilService.getLocalStorageItem(APP_CONSTANTS.FIELD_ROLE) === ROLES.SELLER.code;
    }

    isCustomer() {
        return this._utilService.getLocalStorageItem(APP_CONSTANTS.FIELD_ROLE) === ROLES.CUSTOMER.code;
    }
}

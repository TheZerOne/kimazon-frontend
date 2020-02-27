import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { APP_CONSTANTS } from '../constants/app-constants';
import { DB_CONSTANTS } from '../constants/db-constants';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    public urlConstant: any;
    private previousUrl: string = undefined;
    private currentUrl: string = undefined;

    constructor(private http: HttpClient,
                private router: Router,
                private _toasterService: ToastrService) {

        this.currentUrl = this.router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
            }
        });
    }

    /**
     *
     * @param1 {string} param1
     * @param2 {string} param2
     * To generate the link for API call
     */

    linkGeneration(param1, param2 = '', param3 = '') {
        // return 'http://' + environment.api_host + ':' + environment.api_host_port +  param1.prefix + param2 + param3;

        // const host = window.location.hostname;
        if (environment.production) {
            return `${location.protocol}//` + location.host + param1.prefix + param2 + param3;

        } else {
            return 'http://' + environment.api_host + ':' + environment.api_host_port + param1.prefix + param2 + param3;
        }
    }

    callGetAPI(url) {
        return this.http.get(url, this.setHeader());
    }


    callPostAPI(url, body) {
        return this.http.post(url, body, this.setHeader());
    }

    /**
     *
     * To set the headers
     */
    setHeader() {
        const headers = {};
        const userCode = sessionStorage.getItem('userCode');
        const authToken = sessionStorage.getItem('authorizationToken');
        headers[APP_CONSTANTS.VALUE_CONTENT_TYPE] = 'application/json';
        if (userCode) {
            headers[DB_CONSTANTS.FIELD_USER_ID] = userCode;
        }
        return headers;
    }

    validateEmail(email) {
        // tslint:disable-next-line:max-line-length
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // routing urls
    public getPreviousUrl() {
        return this.previousUrl;
    }

    public getCurrentUrl() {
        return this.currentUrl;
    }

    setLocalStorage(key: any, value: any) {
        localStorage.setItem(key, value);

    }


    toast(message, title = 'Attention', type = 'success') {
        if (type === 'success') {
            this._toasterService.success(message, title);
        } else if (type === 'error') {
            this._toasterService.error(message, title);
        }
    }

    getLocalStorageItem(key) {
        return localStorage.getItem(key);
    }

    isLoggedIn() {
        return this.getLocalStorageItem(APP_CONSTANTS.FIELD_USER_ID);
    }
}

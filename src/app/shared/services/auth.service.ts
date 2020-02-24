import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../constants/app-constants';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private _utilsService: UtilsService,
                private _sessionService: SessionService) {
    }

    registerUser(reqBody: any) {
        const url = `${this._utilsService.linkGeneration(environment.auth, environment.auth.register)}`;
        this._utilsService.callPostAPI(url, reqBody).subscribe(res => {
            if (res) {
                console.log(res);
            }
        });

    }

    login(body: any): Observable<any> {
        const observable = new Observable(observer => {
            const url = this._utilsService.linkGeneration(environment.auth, environment.auth.login);
            this._utilsService.callPostAPI(url, body).subscribe(
                response => {
                    if (response) {
                        const resData = response[APP_CONSTANTS.FIELD_DATA];
                        if (resData && resData.valid) {
                            this._utilsService.setLocalStorage(APP_CONSTANTS.FIELD_USER_ID, resData.user_details.id);
                            this._utilsService.setLocalStorage(APP_CONSTANTS.FIELD_ROLE, resData.user_details.role);
                            this._sessionService.saveCompleteUser(resData);
                            observer.next(response);
                        } else if (resData) {
                            observer.next(response);
                        } else {
                            observer.next(false);
                        }
                    } else {
                        observer.next(false);
                    }
                    observer.complete();
                }, error => {
                    observer.next(false);
                    observer.complete();
                },
                () => {
                    observer.next(false);
                    observer.complete();
                }
            );
        });
        return observable;
    }

    sendPasswordResetEmail(body) {
        const url = this._utilsService.linkGeneration(environment.auth, environment.auth.password_reset_email);
        return this._utilsService.callPostAPI(url, body);
    }
}

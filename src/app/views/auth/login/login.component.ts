import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../shared/services/utils.service';
import { AuthService } from '../../../shared/services/auth.service';
import { SessionService } from '../../../shared/services/session.service';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from '../../../shared/constants/app-constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    credentials: any = {};

    constructor(private _authService: AuthService,
                private _utilService: UtilsService,
                private _router: Router,
                private  _sessionService: SessionService) {
    }

    ngOnInit(): void {
    }

    login() {
        this._authService.login(this.credentials).subscribe(response => {
            const data = response[APP_CONSTANTS.FIELD_DATA];
            if (data.valid) {
                this._utilService.toast('Successfully Signed in!');
                if (this._sessionService.isSeller()) {
                    this._router.navigate(['/partner']);
                } else if (this._sessionService.isCustomer()) {
                    this._router.navigate(['/public']);
                }
            } else if (!data.valid && response.errors) {
                this._utilService.toast(response.errors, 'Error!', 'error');
            } else {
                this._utilService.toast('Couldn\'t Login! Try Again Letter', 'Error!', 'error');
            }
        });
    }
}

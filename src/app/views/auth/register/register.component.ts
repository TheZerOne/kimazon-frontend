import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/User';
import { AuthService } from '../../../shared/services/auth.service';
import { APP_CONSTANTS } from '../../../shared/constants/app-constants';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    constructor(private _authService: AuthService) {
    }

    user: User = new User();

    ngOnInit() {
    }

    submit() {
    }

    submitRegister() {

        const reqBody = {};
        reqBody[APP_CONSTANTS.FIELD_USER_DETAILS] = this.user;
        this._authService.registerUser(reqBody);

    }

}

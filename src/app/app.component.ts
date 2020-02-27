import { Component, ViewEncapsulation } from '@angular/core';
import { UtilsService } from './shared/services/utils.service';
import { SessionService } from './shared/services/session.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'kimazon-frontend';

    constructor(public _utilService: UtilsService,
                private _sessionService: SessionService) {
    }

    logout() {
        this._sessionService.destroy();
    }
}

import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { NotificationService } from './notification.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(public platform: Platform,
        private notificationService: NotificationService) {

        this.platform.ready().then(() => {
            if (!this.platform.is('cordova'))
                this.notificationService.showWarning("O Banco de dados SQLite só funciona em ambientes cordova.")
        })
    }
}
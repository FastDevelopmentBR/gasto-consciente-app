import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Custom Providers
import { ErrorService } from './error.service';

// Others
import { GlobalErrorHandler } from './global-error-handler';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationService } from './notification.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },

        ErrorService,
        NotificationService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

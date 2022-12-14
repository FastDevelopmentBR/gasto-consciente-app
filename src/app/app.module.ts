import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Custom Modules
import { SharedModule } from './shared/shared.module';

// Native Plugins
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';

// Custom Providers
import { ErrorService } from './error.service';
import { DatabaseService } from './services/db/database.service';

// DB Providers
import { MovimentationsRepositoryService } from './services/db/movimentations-repository.service';

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
        AppRoutingModule,
        SharedModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },

        SQLite,
        SQLitePorter,

        ErrorService,
        NotificationService,
        DatabaseService,
        MovimentationsRepositoryService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

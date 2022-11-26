import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DayJSDatePipe } from './pipes/dayjs-date.pipe';

@NgModule({
    declarations: [
        DayJSDatePipe,
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,

        DayJSDatePipe
    ],
    providers: [],
    bootstrap: [],
})
export class SharedModule { }

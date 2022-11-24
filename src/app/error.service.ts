import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getMessage(error: Error): string {
        return error.message ? error.message : error.toString();
    }

    getStack(error: Error): string {
        return error.stack;
    }
}
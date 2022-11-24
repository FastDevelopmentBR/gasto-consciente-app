import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { ErrorService } from './error.service';
import { NotificationService } from './notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: Error) {

        const errorService = this.injector.get(ErrorService);
        const notifier = this.injector.get(NotificationService);

        let message = errorService.getMessage(error);
        let stackTrace = errorService.getStack(error);
        notifier.showError(message);

        // Always log errors
        // logger.logError(message, stackTrace);

        console.error(error);
    }

}
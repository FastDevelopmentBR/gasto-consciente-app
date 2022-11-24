import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private toastController: ToastController) { }

    showSuccess(message: string): void {
        this.presentToast({ message })
    }

    showWarning(message: string): void {
        this.presentToast({
            message,
            icon: 'warning-outline',
            color: 'warning'
        })
    }

    showError(message: string = "Erro Desconhecido"): void {
        this.presentToast({
            message,
            icon: 'alert-circle-outline',
            color: 'danger'
        })
    }

    async presentToast(options: ToastOptions) {
        let toastOptions = Object.assign({ duration: 1500 }, options)
        const toast = await this.toastController.create(toastOptions);
        await toast.present();
    }
}
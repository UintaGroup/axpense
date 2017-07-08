import { Injectable }              from '@angular/core';
import { Toast, ToastController }  from 'ionic-angular';

@Injectable()
export class LoggerService {

	constructor(private _toastCtrl: ToastController) {
	}

	public log(...args: any[]): void {
		console.log(args);
	}

	public error(message: string, data?: any): void {
		console.error(message, data);
		this.toast(message, 'toast-error');
	}

	public success(message: string): void {
		console.log(message);
		this.toast(message, 'toast-success');
	}

	public warning(message: string, data?: any): void {
		console.warn(message, data);
		this.toast(message, 'toast-warn');
	}

	private toast(message: string, cssClass?: string): Promise<any> {
		let toast: Toast = this._toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'top',
			cssClass: cssClass
		});
		return toast.present();
	}
}

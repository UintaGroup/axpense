import {Injectable} from '@angular/core';
import { Toast } from '@ionic-native/toast';

@Injectable()
export class LoggerService {

	constructor(private _toast: Toast) {
	}

	private window: any = <any>window;

	public log(...args: any[]): void {
		console.log(args);
	}

	public error(message: string, data?: any): void {
		console.error(message, data);
		this.toast(message);
	}

	public success(message: string): void {
		console.info(message);
		this.toast(message);
	}

	public warning(message: string, data?: any): void {
		console.warn(message, data);
		this.toast(message);
	}

	private toast(message: string): void {
		this._toast.showLongTop(message);
	}
}

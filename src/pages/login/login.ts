import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Credentials } from '../../models';
import { AuthService } from '../../providers';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	public credentials: Credentials = {
		username: 'user@email.com',
		password: '123456'
	};

	private loginErrorString: string;

	constructor(private _authSrvc: AuthService,
		private _toastCtrl: ToastController,
		translateSrvc: TranslateService) {

		translateSrvc
			.get('LOGIN_ERROR')
			.subscribe(value => this.loginErrorString = value);
	}

	public doLogin(): any {
		this._authSrvc
			.login(this.credentials)
			.subscribe(
				() => console.log(),
				err => {
					let toast = this._toastCtrl.create({
						message: this.loginErrorString,
						duration: 3000,
						position: 'top'
					});
					toast.present();
				});
	}
}

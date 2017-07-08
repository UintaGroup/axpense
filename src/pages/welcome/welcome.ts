import { Component }     from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage }     from '../login/login';
import { SignupPage }    from '../signup/signup';

@Component({
	selector: 'page-welcome',
	templateUrl: 'welcome.html'
})
export class WelcomePage {

	constructor(public navCtrl: NavController) {
	}

	public login(): Promise<any> {
		return this.navCtrl.push(LoginPage);
	}

	public signup(): Promise<any> {
		return this.navCtrl.push(SignupPage);
	}
}

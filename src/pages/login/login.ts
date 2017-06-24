import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

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

  constructor(public navCtrl: NavController,
      public authSrvc: AuthService,
      public toastCtrl: ToastController,
      public translateSrvc: TranslateService) {

    this.translateSrvc
		.get('LOGIN_ERROR')
		.subscribe(value => this.loginErrorString = value);
  }

  public doLogin(): any {
    this.authSrvc
		.login(this.credentials)
		.subscribe(
            () => {
              console.log();
            },
            (err) => {
              let toast = this.toastCtrl.create({
                message: this.loginErrorString,
                duration: 3000,
                position: 'top'
              });
              toast.present();
            });
  }
}

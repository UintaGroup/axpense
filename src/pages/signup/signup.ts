import { Component }                            from '@angular/core';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { NavController, ToastController }       from 'ionic-angular';
import { TranslateService }                     from '@ngx-translate/core';

import { MAIN_PAGE }                             from '../index';
import { Account }                              from '../../models';
import { RegistrationService }                  from '../../providers';
import { GlobalValidator } from '../../common/validators/global.validators';
@Component({
	selector: 'page-signup',
	templateUrl: './signup.html'
})
export class SignupPage {

	public form: FormGroup;
	public formValid: boolean;

	private signupErrorString: string;

	constructor(private _navCtrl: NavController,
		private _registrationSrvc: RegistrationService,
		private _toastCtrl: ToastController,
		formBuilder: FormBuilder,
		translateSrvc: TranslateService) {

		translateSrvc.get('SIGNUP_ERROR').subscribe((value) => {
			this.signupErrorString = value;
		})
		this.buildForm(formBuilder);
	}

	buildForm(formBuilder: FormBuilder): any {
		this.form = formBuilder.group({
			name: ['', Validators.required],
			email: ['', Validators.required, GlobalValidator.mailFormat],
			password: ['', Validators.required],
			passwordConfirm: ['', Validators.required]
		});

		this.form.valueChanges.subscribe(v => this.formValid = this.form.valid);
	}

	doSignup(account: Account) {
		this._registrationSrvc.signUp(account)
			.subscribe(resp => this._navCtrl.push(MAIN_PAGE),
				err => {
					this._navCtrl.push(MAIN_PAGE); // TODO: Remove this when you add your signup endpoint

					let toast = this._toastCtrl.create({
						message: this.signupErrorString,
						duration: 3000,
						position: 'top'
					});
					toast.present();
				});
	}
}

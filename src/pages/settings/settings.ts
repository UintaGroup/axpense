import { Component }                from '@angular/core';
import { FormBuilder, FormGroup }   from '@angular/forms';

import { SettingsService }          from '../../providers';

@Component({
	selector: 'page-settings',
	templateUrl: './settings.html'
})
export class SettingsPage {

	options: any;
	form: FormGroup;
	settingsReady: boolean = false;

	constructor(private _settings: SettingsService, private _formBuilder: FormBuilder) {
	}

	private buildForm(settings: any) {
		this.form = this._formBuilder.group({
			saveReceiptToGallery: [settings.saveReceiptToGallery],
			receiptImageQuality: [settings.receiptImageQuality],
			reportDuration: [settings.reportDuration]
		});
		this.form.valueChanges.subscribe(v => this._settings.merge(this.form.value));
	}

	ionViewDidLoad() {
		this.form = this._formBuilder.group({});
	}

	ionViewWillEnter() {
		this._settings.load()
			.then(() => {
				this.settingsReady = true;
				this.buildForm(this._settings.allSettings);
			});
	}

	ngOnChanges() {
		console.log('Ng All Changes');
	}
}

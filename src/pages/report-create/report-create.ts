import { Component }                            from '@angular/core';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { ViewController }                       from 'ionic-angular';
import { DateService }                          from '../../common';
import { SettingsService }                      from '../../providers';
import { Report }                               from '../../models';

@Component({
	selector: 'page-report-create',
	templateUrl: './report-create.html'
})
export class ReportCreatePage {

	private _options: any;

	public formValid: boolean;
	public form: FormGroup;

	constructor(private _viewCtrl: ViewController,
				formBuilder: FormBuilder,
				settingsSrvc: SettingsService,
				dateSrvc: DateService) {

		this.loadSettings(settingsSrvc)
			.then(() => this.buildForm(formBuilder, dateSrvc, this._options.reportDuration));
	}

	public cancel(): any {
		return this._viewCtrl.dismiss();
	}

	public submit(): any {
		if (!this.form.valid) {
			return;
		}
		return this._viewCtrl.dismiss(Report.create(this.form.value));
	}

	public buildForm(formBuilder: FormBuilder, dateService: DateService, dateOffset: number): any {

		this.form = formBuilder.group({
			name: ['', Validators.required],
			created: [dateService.now(), Validators.required],
			startDate: [dateService.now(), Validators.required],
			endDate: [dateService.addDays(dateOffset), Validators.required]
		});

		this.form.valueChanges.subscribe(() => this.formValid = this.form.valid);
	}

	public loadSettings(service: SettingsService): Promise<any> {
		return service.load()
			.then(() => this._options = service.allSettings);
	}
}

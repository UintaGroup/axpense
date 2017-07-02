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

	constructor(private viewCtrl: ViewController,
				formBuilder: FormBuilder,
				settingsSrvc: SettingsService,
				dateSrvc: DateService) {

		this.loadSettings(settingsSrvc)
			.then(() => this.buildForm(formBuilder, dateSrvc, this._options.reportDuration));
	}

	cancel(): any {
		this.viewCtrl.dismiss();
	}

	submit(): any {
		if (!this.form.valid) {
			return;
		}
		return this.viewCtrl.dismiss(Report.create(this.form.value));
	}

	buildForm(formBuilder: FormBuilder, dateService: DateService, dateOffset: number): any {
		this.form = formBuilder.group({
			name: ['', Validators.required],
			created: [dateService.now(), Validators.required],
			startDate: [dateService.now(), Validators.required],
			endDate: [dateService.addDays(dateOffset), Validators.required]
		});

		this.form.valueChanges.subscribe(v => this.formValid = this.form.valid);
	}

	loadSettings(service: SettingsService): Promise<any> {
		return service.load()
			.then(() => this._options = service.allSettings);
	}
}

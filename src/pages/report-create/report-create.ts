import { Component }                            from '@angular/core';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { ViewController }                       from 'ionic-angular';
import { Report }                               from '../../models';

@Component({
	selector: 'page-report-create',
	templateUrl: './report-create.html'
})
export class ReportCreatePage {

	public formValid: boolean;
	public form: FormGroup;

	constructor(public viewCtrl: ViewController, formBuilder: FormBuilder) {
		this.form = formBuilder.group({
			name: ['', Validators.required],
			created: [new Date(), Validators.required],
			startDate: ['', Validators.required],
			endDate: ['', Validators.required]
		});

		this.form.valueChanges.subscribe(v => this.formValid = this.form.valid);
	}

	public cancel(): any {
		this.viewCtrl.dismiss();
	}

	public done(): any {
		if (!this.form.valid) {
			return;
		}
		return this.viewCtrl.dismiss(Report.create(this.form.value));
	}
}

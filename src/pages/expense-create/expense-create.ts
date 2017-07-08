import { Component }                            from '@angular/core';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { Camera }                               from '@ionic-native/camera';
import { ViewController }                       from 'ionic-angular';
import { Observable }                           from 'rxjs/Observable';
import { Expense, Category }                    from '../../models';
import { CategoryService, LoggerService, SettingsService }                      from '../../providers';
import { BasePage }                             from '../base.page';
import { DateService }                          from '../../common/providers/date-service';

@Component({
	selector: 'page-expense-create',
	templateUrl: './expense-create.html'
})
export class ExpenseCreatePage extends BasePage {

	public categories$: Observable<Category[]>;
	private _options: any;
	public formValid: boolean;
	public form: FormGroup;
	public image: string;

	constructor(public viewCtrl: ViewController,
				formBuilder: FormBuilder,
				categorySrvc: CategoryService,
				private _settingSrv: SettingsService,
				private _loggerSrvc: LoggerService,
				private _camera: Camera,
				dateSrvc: DateService) {
		super();
		this.categories$ = categorySrvc.all();
		this.form = formBuilder.group({
			created: [new Date(), Validators.required],
			amount: ['', Validators.required],
			merchant: ['', Validators.required],
			description: ['', Validators.required],
			categoryId: ['', Validators.required],
			expenseDate: [dateSrvc.now(), Validators.required]
		});
		this.loadSettings();

		this.form.valueChanges.subscribe(v => this.formValid = this.form.valid);
	}

	addReceipt(): Promise<void> {
		return this._camera.getPicture({
				quality: this._options.receiptImageQuality,
				destinationType: this._camera.DestinationType.DATA_URL,
				encodingType: this._camera.EncodingType.JPEG,
				mediaType: this._camera.MediaType.PICTURE
			})
			.then(imageData => this.image = 'data:image/jpeg;base64,' + imageData)
			.catch(err => this._loggerSrvc.error(err))
	}

	cancel(): Promise<any> {
		return this.viewCtrl.dismiss();
	}

	submit(): Promise<any>{
		if (!this.form.valid) {
			return Promise.resolve();
		} else {
			let expense = Expense.create(this.form.value);
			//TODO figure out more elegant solution to expense image.
			expense.image = this.image;
			return this.viewCtrl.dismiss(expense);
		}
	}

	private loadSettings(): Promise<any> {
		return this._settingSrv.load()
			.then(() => {this._options = this._settingSrv.allSettings;
		})
	}
}

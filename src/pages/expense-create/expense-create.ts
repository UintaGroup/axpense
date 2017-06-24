import { Component }                            from '@angular/core';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { ViewController }                       from 'ionic-angular';
import { Expense }                               from '../../models';
import { CategoryService } from '../../providers/category.service';
import { Category } from '../../models/category.model';
import { BasePage } from '../base.page';
import { Observable } from 'rxjs/Observable';
import { Camera } from '@ionic-native/camera';

@Component({
	selector: 'page-expense-create',
	templateUrl: './expense-create.html'
})
export class ExpenseCreatePage extends BasePage {

	public categories$: Observable<Category[]>;
	public formValid: boolean;
	public form: FormGroup;

	constructor(public viewCtrl: ViewController, formBuilder: FormBuilder, categorySrvc: CategoryService, camera: Camera) {
		super();
		this.categories$ = categorySrvc.all();
		this.form = formBuilder.group({
			created: [new Date(), Validators.required],
			amount: ['', Validators.required],
			merchant: ['', Validators.required],
			description: ['', Validators.required],
			image: [''],
			categoryId: ['', Validators.required]
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
		return this.viewCtrl.dismiss(Expense.create(this.form.value));
	}
}

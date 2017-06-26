import { Component }                            from '@angular/core';
import { IonicPage, NavController, NavParams }  from 'ionic-angular';
import { Expense }                              from '../../models';

@IonicPage()
@Component({
	selector: 'page-expense-detail',
	templateUrl: 'expense-detail.html',
})
export class ExpenseDetailPage {

	public expense: Expense;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.expense = navParams.data.expense;
	}

	ionViewDidLoad() {
		console.log('VIEWING EXPENSE', this.expense);
	}
}

import { Component }            from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Expense }              from '../../models';

@IonicPage()
@Component({
	selector: 'page-expense-detail',
	templateUrl: './expense-detail.html',
})
export class ExpenseDetailPage {

	public expense: Expense;

	constructor(navParams: NavParams) {
		this.expense = navParams.data.expense;
	}
}

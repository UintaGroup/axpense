import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Report } from '../../models/report.model';
import { ExpenseCreatePage } from '../expense-create/expense-create';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../providers/expense.service';
import { ExpenseDetailPage } from '../expense-detail/expense-detail';

@IonicPage()
@Component({
	selector: 'page-report-expenses-tab',
	templateUrl: 'report-expenses-tab.html',
})
export class ReportExpensesTabPage {

	report: Report;
	expenses: Expense[] = [];

	constructor(private _navParams: NavParams,
				private _navCtrl: NavController,
				private _expenseSrvc: ExpenseService,
				private _modalCtrl: ModalController) {
		this.report = this._navParams.data;
		this.loadExpenses(this.report.id);
	}

	loadExpenses(reportId: number): Promise<any> {
		return this._expenseSrvc.all(reportId)
			.then(expenses => this.expenses = expenses);
	}

	open(expense: Expense): Promise<any> {
		return this._navCtrl.push(ExpenseDetailPage, {expense: expense});
	}

	add(): Promise<any> {
		let addModal = this._modalCtrl.create(ExpenseCreatePage);

		addModal.onDidDismiss(expense => {
			if(expense) {
				this.expenses.push(expense);
				this._expenseSrvc.save(this.report, expense);
			}
		});
		return addModal.present();
	}

	delete(expense: Expense): Promise<any> {
		return this._expenseSrvc.delete(expense)
			.then(() => this.loadExpenses(this.report.id));
	}

}

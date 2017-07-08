import { Component }                                                    from '@angular/core';
import { IonicPage, Modal, ModalController, NavController, NavParams }  from 'ionic-angular';
import { Expense, Report }                                              from '../../models';
import { ExpenseService }                                               from '../../providers';
import { ExpenseDetailPage }                                            from '../expense-detail/expense-detail';
import { ExpenseCreatePage }                                            from '../expense-create/expense-create';

@IonicPage()
@Component({
	selector: 'page-report-expenses-tab',
	templateUrl: 'report-expenses-tab.html',
})
export class ReportExpensesTabPage {

	public report: Report;
	public expenses: Expense[] = [];

	constructor(private _navParams: NavParams,
				private _navCtrl: NavController,
				private _expenseSrvc: ExpenseService,
				private _modalCtrl: ModalController) {
		this.report = this._navParams.data;
		this.loadExpenses(this.report.id);
	}

	public loadExpenses(reportId: number): Promise<any> {
		return this._expenseSrvc.all(reportId)
			.then(expenses => this.expenses = expenses);
	}

	public open(expense: Expense): Promise<any> {
		return this._navCtrl.push(ExpenseDetailPage, {expense: expense});
	}

	public add(): Promise<any> {
		let addModal: Modal = this._modalCtrl.create(ExpenseCreatePage);

		addModal.onDidDismiss(expense => {
			if(expense) {
				this.expenses.push(expense);
				this._expenseSrvc.save(this.report, expense);
			}
		});
		return addModal.present();
	}

	public delete(expense: Expense): Promise<any> {
		return this._expenseSrvc.remove(expense)
			.then(() => this.loadExpenses(this.report.id));
	}

}

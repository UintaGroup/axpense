import { Component }                from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Report, Expense }          from '../../models';
import { ExpenseService }           from '../../providers';
import { ExpenseCreatePage }        from '../../pages';


@Component({
	selector: 'page-report-detail',
	templateUrl: './report-detail.html'
})
export class ReportDetailPage {
	report: Report;
	expenses: Expense[];

	constructor(public navCtrl: NavController, navParams: NavParams, private _expenseSrvc: ExpenseService, private _modalCtrl: ModalController) {
		this.report = navParams.get('report');

		this._expenseSrvc.all(this.report.id)
		    .then(expenses => this.expenses = expenses)
	}

	add(): Promise<any> {
		let addModal = this._modalCtrl.create(ExpenseCreatePage);


		addModal.onDidDismiss(expense => {
			if(expense) {
				this.expenses.push(expense);
				this._expenseSrvc
				    .save(this.report, expense);
			}
		});
		return addModal.present();
	}
}

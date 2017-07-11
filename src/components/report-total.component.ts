import { Component, Input, OnInit } from '@angular/core';
import { ExpenseService }           from '../providers';
import { Report, Expense }          from '../models';

@Component({
	selector: 'report-total',
	template: `<h3>{{total | currency:'USD':true:'1.2-2'}}</h3>`
})

export class ReportTotalComponent implements OnInit {

	@Input()
	private report: Report;
	public total: number;

	constructor(private _expenseSrvc: ExpenseService) {
	}

	public ngOnInit(): any {
		this._expenseSrvc.all(this.report.id)
			.then(expenses => {
				this.total = expenses.reduce((total: number, expense: Expense) => total + expense.amount, 0);
			});
	}
}
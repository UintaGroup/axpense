import { Injectable }       from '@angular/core';
import 'rxjs/add/operator/map';

import { Report, Expense }  from '../models';
import { LocalDb }          from './local-db.service';

@Injectable()
export class ExpenseService {

	constructor(private _db: LocalDb) {
	}

	public all(reportId: number): Promise<Expense[]> {
		return this._db.queryWithArrayResult(`SELECT * FROM ${Expense.tableName} WHERE reportId = ?`, [reportId])
			.then(rows => rows.map(row => Expense.create(row)));
	}

	public save(report: Report, expense: Expense): Promise<Expense> {
		expense.reportId = report.id;

		return this._db.insert(Expense.tableName, expense)
			.then(data => {
				let id: number = expense.id > 0 ? expense.id : data.res.insertId;
				expense['_id'] = id;
				return expense;
			});
	}

	public deleteOne(expense: Expense): Promise<any> {
		return this._db.query(`DELETE FROM ${Expense.tableName} WHERE id = ?`, [expense.id]);
	}

	public deleteAll(report: Report): Promise<any> {
		return this._db.query(`DELETE FROM ${Expense.tableName} WHERE reportId = ?`, [report.id]);
	}

}

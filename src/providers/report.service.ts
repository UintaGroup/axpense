import { Injectable }       from '@angular/core';
import 'rxjs/add/operator/map';
import { Report }           from '../models';
import { LocalDb }          from './local-db.service';
import { ExpenseService }   from './expense.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportService {

	constructor(private _db: LocalDb, private _expenseSrvc: ExpenseService) {
	}

	public all(): Promise<Report[]> {
		return this._db.queryWithArrayResult('SELECT * FROM reports')
			.then(rows => rows.map(row => Report.create(row)));
	}

	public all$(): Observable<Report[]> {
		return Observable.fromPromise(this._db.queryWithArrayResult('SELECT * FROM reports')
			.then(rows => rows.map(row => Report.create(row))));
	}

	public save(report: Report): Promise<Report> {
		return this._db.insert(Report.tableName, report)
			.then(data => {
				let id: number = report.id > 0 ? report.id : data.res.insertId;
				report['_id'] = id;
				return report;
			});
	}

	public delete(report: Report): Promise<any> {
		return Promise.all([
			this._db.query(`DELETE FROM ${Report.tableName} WHERE id = ?`, [report.id]),
			this._expenseSrvc.deleteAll(report)
		]);
	}

}

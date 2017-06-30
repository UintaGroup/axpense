import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { LoggerService } from './logger.service';
import { IDbTable, QueryBuilder } from '../models';

const DB_NAME: string = '__axpense';
const win: any = window;

@Injectable()
export class RdbStore {
	private _db: any = null;

	constructor(private _logger: LoggerService) {
	}

	public init(): Promise<void> {
		return this.openConnection();
	}

	private openConnection(): Promise<any> {
		if (this._db !== null) {
			return Promise.resolve();
		}
		if (win.sqlitePlugin) {
			let db: SQLite = new SQLite();
			return db.create({
					name: DB_NAME,
					location: 'default'
				})
				.then(d => this._db = d);
		} else {
			console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
			this._db = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
			return Promise.resolve();
		}
	}

	/**
	 * Perform an arbitrary SQL operation on the database. Use this method
	 * to have full control over the underlying database through SQL operations
	 * like SELECT, INSERT, and UPDATE.
	 *
	 * @param {string} query the query to run
	 * @param {array} params the additional params to use for query placeholders
	 * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
	 */
	public query(query: string, params: any[] = []): Promise<any> {
		// return this._db.transaction(tx =>
		// 		tx.executeSql(query, params), err => this._logger.error(err), this._logger.log(query + ' completed')
		// );
		return new Promise((resolve, reject) => {
			try {
				return this.openConnection().then(() =>
					this._db.transaction((tx: any) => {
							tx.executeSql(query, params,
								(innerTx: any, res: any) => resolve({tx: innerTx, res: res}),
								(innerTx: any, err: any) => reject({tx: innerTx, err: err}));
						},
						(err: any) => reject({err: err}))
				);
			} catch (err) {
				reject({err: err});
			}
		});
	}

	public queryWithArrayResult(query: string, params?: any[]): Promise<Array<any>> {
		return this.query(query, params)
			.then(results => {
				let final: any[] = [];
				for (let i: number = 0; i < results.res.rows.length; i++) {
					final.push(results.res.rows.item(i));
				}
				return final;
			});
	}

	public transaction(table: IDbTable, rows: any[], callback: (t: IDbTable, r: any[]) => QueryBuilder): Promise<any> {
		return this._db.transaction(tx => Promise.all(rows.map(row => {
				let qb = callback(table, row);
				return tx.executeSql(qb.query, qb.queryArgs);
			})),
			err => this._logger.error(err),
			this._logger.log('sync for "' + table.name + '" with ' + rows.length + ' rows completed'));
	}
}
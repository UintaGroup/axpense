import { Injectable }       from '@angular/core';
import { SQLite }           from '@ionic-native/Sqlite';
import { Platform }         from 'ionic-angular';
import { IDbTable, QueryBuilder }   from '../models';
import { LoggerService }    from './logger.service';

const DB_NAME: string = '__axpense';
const win: any = window;

@Injectable()
export class SqlStore {

	private _db: any;

	public constructor(platform: Platform, sqlLite: SQLite, private _logger: LoggerService) {
		if (platform.is('cordova')) {
			sqlLite.create({
						name: DB_NAME,
						location: 'default'
					})
					.then(db => this._db = db);
		} else {
			console.warn(
				'Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
			this._db = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
		}
	}

	public query(query: string, params: any[] = []): Promise<any> {
		return this._db.transaction(tx => {
				tx.executeSql(query, params);
			},
			err => console.log(err),
			console.log(''));
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
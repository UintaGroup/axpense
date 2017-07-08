import { Injectable }             from '@angular/core';
import { Storage }                from '@ionic/storage';
import { IDbTable, QueryBuilder } from '../models';
import { QueryBuilderService }    from './query-builder.service';
import { RdbStore }               from './rdb-store.service';

@Injectable()
export class LocalDb {

	constructor(private _kvStore: Storage,
		private _rdbStore: RdbStore,
		private _queryBuilder: QueryBuilderService,
		private _tables: IDbTable[]) {
		this._rdbStore.init();
	}

	public queryWithBuilder(queryBuilder: QueryBuilder): Promise<any> {
		return this._rdbStore.query(queryBuilder.query, queryBuilder.queryArgs);
	}

	public query(query: string, params?: any[]): Promise<any> {
		return this._rdbStore.query(query, params);
	}

	public queryWithArrayResult(query: string, params?: any[]): Promise<Array<any>> {
		return this._rdbStore.queryWithArrayResult(query, params);
	}

	public get(key: string): Promise<any> {
		return this._kvStore.get(key)
			.then(results => {
				if (results && results[0] === '{') {
					return JSON.parse(results);
				} else {
					return results;
				}
			});
	}

	public set(key: string, value: any): Promise<any> {
		if (value instanceof Object) {
			value = JSON.stringify(value);
		}
		return this._kvStore.set(key, value);
	}

	public allKeys(): Promise<any> {
		return this._kvStore.keys();
	}

	public removeKvp(key: string): Promise<void> {
		return this._kvStore.remove(key);
	}

	public removeAllKvp(): Promise<void> {
		return this._kvStore.clear();
	}

	public forEachKvp(callback: (value: any, key: string, index: number) => Promise<any>): Promise<void> {
		return this._kvStore.forEach(callback);
	}

	private resetDb(tables: IDbTable[], reset: boolean = false): Promise<any> {
		if (reset !== true) {
			return Promise.resolve();
		} else {
			return this._kvStore.clear()
				.then(() => Promise.all(
					tables.filter(() => reset)
					.map(table => this.queryWithBuilder(this._queryBuilder.drop(table.name)))));
		}
	}

	public initialize(reset?: boolean): Promise<any> {
		return this.resetDb(this._tables, reset)
			.then(() => Promise.all(
				this._tables
					.filter(table => table.isObject !== true)
					.map(table => this.queryWithBuilder(this._queryBuilder.create(table)))
			));
	}

	public dropAndCreate(tableName: string): Promise<any> {
		return Promise.all(
			this._tables
				.filter(tbl => (tbl.name === tableName) && (tbl.isObject !== true))
				.map(tbl => this.queryWithBuilder(this._queryBuilder.drop(tbl.name))
					.then(() => this.queryWithBuilder(this._queryBuilder.create(tbl))))
		);
	}

	public seedTable(tableName: string, rows: any[]): Promise<any> {
		return Promise.all(this._tables
			.filter(tbl => tbl.name === tableName)
			.map(t => t.isObject === true ? this.set(t.name, rows[0]) : this._rdbStore.transaction(t, rows, this._queryBuilder.insert)));
	}

	public insert(tableName: string, model: any): Promise<any> {
		let table: IDbTable = this._tables.find(tbl => tbl.name === tableName);
		let qb: QueryBuilder = this._queryBuilder.update(table, model);
		return this.queryWithBuilder(qb);
	}
}
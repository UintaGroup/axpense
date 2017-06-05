import { Injectable }               from '@angular/core';

import { Storage }                  from '@ionic/storage';
import { DbConfig }                 from './db-config.service';
import { QueryBuilderService }      from './query-builder.service';
import { SqlStore }                 from './sql-store.service';
import { IDbTable, QueryBuilder }   from '../models';

@Injectable()
export class LocalDb {

	constructor(private _db: SqlStore,
		private _storage: Storage,
		private _queryBuilder: QueryBuilderService,
		private _tables: IDbTable[]) {
	}

	public queryWithBuilder(queryBuilder: QueryBuilder): Promise<any> {
		return this._db.query(queryBuilder.query, queryBuilder.queryArgs);
	}

	public query(query: string, params?: any[]): Promise<any> {
		return this._db.query(query, params);
	}

	public queryWithArrayResult(query: string, params?: any[]): Promise<Array<any>> {
		return this._db.query(query, params).then((results) => {
			let final: any[] = [];
			for (let i: number = 0; i < results.res.rows.length; i++) {
				final.push(results.res.rows.item(i));
			}
			return final;
		});
	}

	private resetDb(tables: IDbTable[], reset: boolean = false): Promise<any> {
		return Promise.all(tables
			.filter(tables => reset)
			.map(table => this.queryWithBuilder(this._queryBuilder.drop(table.name))));
	}

	public setupDb(reset?: boolean): Promise<any> {

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
								.map(t => t.isObject === true ? this.set(t.name, rows[0]) : this._db.transaction(t, rows, this._queryBuilder.insert)));
	}

	public insert(tableName: string, model: any): Promise<any> {
		let table: IDbTable = this._tables.find(tbl => tbl.name === tableName);
		let qb = this._queryBuilder.update(table, model);
		return this.queryWithBuilder(qb);
	}

	public get(key: string): Promise<any> {
		return this._storage.ready()
		           .then(() => this._storage.get(key))
		           .then(results => {
			           if (results && results[0] === '{') {
				           return JSON.parse(results);
			           } else {
				           return results;
			           }
		           });
	}

	public set(key: string, value: any): Promise<void> {
		if (value instanceof Object) {
			value = JSON.stringify(value);
		}
		return this._storage.ready()
		           .then(() => this._storage.setItem(key, value));
	}

	public remove(key: string): Promise<any> {
		return this._storage.ready()
		           .then(() => this._storage.removeItem(key));
	}

	public clear(): Promise<any> {
		return this._storage.ready()
		           .then(() => this._storage.clear());
	}
}
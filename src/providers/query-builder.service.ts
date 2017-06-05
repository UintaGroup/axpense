import { Injectable }               from '@angular/core';
import { IDbTable, QueryBuilder }   from '../models';

@Injectable()
export class QueryBuilderService {
	public select(tableName: string, pargs?: [[string, any]]): QueryBuilder {
		let query: string = 'SELECT * FROM ' + tableName;
		let args: string[] = new Array(pargs ? pargs.length : 0);
		if (pargs && pargs.length > 0) {
			query += ' WHERE ';
			for (let i: number = 0; i < pargs.length; i++) {
				query += pargs[i][0] + ' = ? ';
				if (pargs.length - 1 > i) {
					query += ' AND ';
				}
				args[i] = pargs[i][1];
			}
		}
		return new QueryBuilder(query, args);
	}

	public drop(tableName: string): QueryBuilder {
		let query: string = `DROP TABLE IF EXISTS ${tableName}`;
		return new QueryBuilder(query, []);
	}

	public create(table: IDbTable): QueryBuilder {
		let query: string = 'CREATE TABLE IF NOT EXISTS ' + table.name +
			'(' + table.columns.map((c) => {
				return c.name + ' ' + c.type;
			}).join(', ');
		query = query.slice(0, query.length - 1) + ')';
		return new QueryBuilder(query, []);
	}

	public insert(table: IDbTable, row: any): QueryBuilder {
		let params: any[] = [];

		let query: string = 'INSERT OR REPLACE INTO ' + table.name +
			' (' + table.columns.map((c) => {
				return c.name;
			}).join(', ') + ') VALUES(';

		table.columns.forEach((col, j) => {
			query += (j === 0 ? '?' : ', ?');
			params.push(row[col.name]);
		});
		query += ')';
		return new QueryBuilder(query, params);
	}

	public update(table: IDbTable, model: any): QueryBuilder {
		let params: any[] = [];
		let query: string = 'INSERT OR REPLACE INTO ' + table.name + ' (';
		let first: boolean = true;
		table.columns.forEach((col) => {
			if (col.name !== 'id' || (col.name === 'id' && model.id > 0)) {
				query += (first ? col.name : ', ' + col.name);
				first = false;
			}
		});
		query += ') VALUES(';
		first = true;
		table.columns.forEach((col) => {
			if (col.name !== 'id' || (col.name === 'id' && model.id > 0)) {
				query += (first ? '?' : ', ?');
				params.push(model['_' + col.name]);
				first = false;
			}
		});
		query += ')';

		return new QueryBuilder(query, params);
	}

}

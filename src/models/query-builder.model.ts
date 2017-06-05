export class QueryBuilder {
	private _query: string = '';
	public get query(): string {
		return this._query;
	}

	private _queryArgs: string[];
	public get queryArgs(): string[] {
		return this._queryArgs;
	}

	constructor(query: string, args: string[]) {
		this._query = query;
		this._queryArgs = args;
	}
}

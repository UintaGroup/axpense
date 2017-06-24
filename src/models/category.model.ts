export class Category {

	constructor(private data: any) {
		for (let f in data) {
			this['_' + f] = data[f];
		}
	}


	private _ledgerAccount: string;
	public get ledgerAccount(): string {
		return this._ledgerAccount;
	}

	public set ledgerAccount(value: string) {
		this._ledgerAccount = value;
	}

	private _name: string;
	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	private _description: string;
	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}
}
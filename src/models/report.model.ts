import { Expense } from './expense.model';

export class Report {

	public static tableName: string = 'reports';

	constructor() {

	}

	public static create(obj: any): Report {
		let o = new Report();
		for (let propName in obj) {
			o['_' + propName] = obj[propName];
		}
		return o;
	}

	private _id: number;
	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	private _created: string;
	public get created(): string {
		return this._created;
	}

	public set created(value: string) {
		this._created = value;
	}

	private _startDate: string;
	public get startDate(): string {
		return this._startDate;
	}

	public set startDate(value: string) {
		this._startDate = value;
	}

	private _endDate: string;
	public get endDate(): string {
		return this._endDate;
	}

	public set endDate(value: string) {
		this._endDate = value;
	}

	private _status: number = 0;
	public get status(): number {
		return this._status;
	}


	private _name: string;
	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	private _expenses: Expense[];
	public get expenses(): Expense[] {
		return this._expenses;
	}

	public set expenses(value: Expense[]) {
		this._expenses = value;
	}
}
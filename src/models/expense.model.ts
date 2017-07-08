export class Expense {

	public static create(obj: any): Expense{
		let o = new Expense();
		for (let propName in obj) {
			o['_' + propName] = obj[propName];
		}
		return o;
	}

	public static tableName: string = 'expenses';

	private _id: number;
	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	private _reportId: number;
	public get reportId(): number {
		return this._reportId;
	}

	public set reportId(value: number) {
		this._reportId = value;
	}

	private _created: string;
	public get created(): string {
		return this._created;
	}

	public set created(value: string) {
		this._created = value;
	}

	private _amount: number;
	public get amount(): number {
		return this._amount;
	}

	public set amount(value: number) {
		this._amount = value;
	}

	private _description: string;
	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}

	private _categoryId: number;
	public get categoryId(): number {
		return this._categoryId;
	}

	public set categoryId(value: number) {
		this._categoryId = value;
	}

	private _image: string;
	public get image(): string {
		return this._image;
	}

	public set image(value: string) {
		this._image = value;
	}

	private _merchant: string;
	public get merchant(): string {
		return this._merchant;
	}

	public set merchant(value: string) {
		this._merchant = value;
	}


	private _expenseDate: string;
	public get expenseDate(): string {
		return this._expenseDate;
	}

	public set expenseDate(value: string) {
		this._expenseDate = value;
	}
}
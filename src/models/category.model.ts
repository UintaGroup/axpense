export class Category {

	public static create(obj: any): Category {
		let o = new Category();
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

	private _name: string;
	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}
}
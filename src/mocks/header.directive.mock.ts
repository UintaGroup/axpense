export class HeaderDirectiveMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('HeaderDirective', ['']);

		return instance;
	}
}
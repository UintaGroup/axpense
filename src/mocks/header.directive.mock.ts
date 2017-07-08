export class HeaderDirectiveMock {
	public static instance(): any {
		return jasmine.createSpyObj('HeaderDirective', ['']);
	}
}
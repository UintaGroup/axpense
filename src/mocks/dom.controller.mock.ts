export class DomControllerMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('DomController', ['read', 'write', 'cancel']);
			instance['debouncer'] = {};

		return instance;
	}
}
export class LoggerServiceMock {
	public static instance(): any {

		let instance: any = jasmine.createSpyObj('LoggerService', [
			'log',
			'error',
			'success',
			'warning'
		]);

		return instance;
	}
}